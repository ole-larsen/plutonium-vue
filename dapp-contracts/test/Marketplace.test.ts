import { ethers } from "hardhat";
import {Marketplace} from "../typechain-types";
import {beforeEach} from "mocha";
import {BigNumber} from "ethers";
import moment from "moment/moment";
import {FactoryOptions} from "@nomiclabs/hardhat-ethers/types";
import type {SignerWithAddress} from "@nomiclabs/hardhat-ethers/src/signers";
// Import utilities from Test Helpers
const { BN, expectEvent, expectRevert } = require('@openzeppelin/test-helpers');

require("chai").use(require("chai-as-promised")).should();
const { expect } = require("chai");

const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

describe("Marketplace", function() {
  async function getFixtures() {
    const marketName = "Ploutonion";
    const marketFee = ethers.utils.parseEther("2.5");

    const [owner, seller, buyer, author] = await ethers.getSigners();

    const MarketplaceFactory = await ethers.getContractFactory("Marketplace", owner);
    const marketPlace = await MarketplaceFactory.deploy(marketName, marketFee);
    await marketPlace.deployed();

    const CollectionFactory = await ethers.getContractFactory("NFTCollection", owner);

    const collectionName = "Monsters";
    const collectionSymbol = "MST";

    const collection = await CollectionFactory.deploy(collectionName, collectionSymbol);
    await collection.deployed();

    const AuctionFactory = await ethers.getContractFactory("NFTAuction", owner);

    return { owner, seller, buyer, author, marketPlace, collection, AuctionFactory }
  }

  before(async function () {
    const { owner, seller, buyer, author, marketPlace, collection, AuctionFactory } = await loadFixture(getFixtures);

    this.owner = owner;
    this.seller = seller;
    this.buyer = buyer;
    this.author = author;
    this.marketPlace = marketPlace;
    this.collection = collection;
    this.AuctionFactory = AuctionFactory;

    this.ownerBalance       = await ethers.provider.getBalance(this.owner.address);
    this.sellerBalance      = await ethers.provider.getBalance(this.seller.address);
    this.buyerBalance       = await ethers.provider.getBalance(this.buyer.address);
    this.authorBalance      = await ethers.provider.getBalance(this.author.address);
    this.marketPlaceBalance = await ethers.provider.getBalance(this.marketPlace.address);
  });

  // nest describe calls to create subsections.
  describe("1. Test marketPlace getters", function () {
    it("1.1 MarketPlace should have valid address", async function () {
      const address = this.marketPlace.address;

      expect(address).not.to.equal("");
      expect(address).not.to.equal(0x0);
      expect(address).not.to.equal(null);
      expect(address).not.to.equal(undefined);
    });

    it("1.2 MarketPlace should have valid name", async function () {
      const name = await this.marketPlace.getName();
      expect(name).not.to.equal("");
      expect(name).not.to.equal(null);
      expect(name).not.to.equal(undefined);
      expect(name).to.equal("Ploutonion");
    });

    it("1.3 MarketPlace should have valid fee in wei", async function () {
      const fee = await this.marketPlace.getFee();
      expect(fee).not.to.equal(0);
      expect(fee).to.equal(ethers.utils.parseEther("2.5"));
    });

    it("1.4 MarketPlace should have valid owner. This test expects the owner variable stored in the contract to be equal to our Signer's owner", async function () {
      expect(await this.marketPlace.getOwner()).to.equal(this.owner.address);
    });

    it("1.5 MarketPlace should have 0 ETH balance", async function () {
      expect(Math.floor(+ethers.utils.formatEther(this.marketPlaceBalance))).to.be.equal(0);
    });

    it("1.6 Other accounts must have positive balance", async function () {
      expect(Math.floor(+ethers.utils.formatEther(this.ownerBalance))).to.be.equal(9999);
      expect(Math.floor(+ethers.utils.formatEther(this.sellerBalance))).to.be.equal(10000);
      expect(Math.floor(+ethers.utils.formatEther(this.buyerBalance))).to.be.equal(10000);
      expect(Math.floor(+ethers.utils.formatEther(this.authorBalance))).to.be.equal(10000);
    });

    it("1.7 MarketPlace userFunds initial test", async function () {
      expect(
        await this.marketPlace.getUserFunds(this.owner.address)
      ).to.be.equal(0);

      expect(
        await this.marketPlace.getUserFunds(this.buyer.address)
      ).to.be.equal(0);

      expect(
        await this.marketPlace.getUserFunds(this.seller.address)
      ).to.be.equal(0);

      expect(
        await this.marketPlace.getUserFunds(this.author.address)
      ).to.be.equal(0);
    });

    it("1.8 MarketPlace have no collections", async function () {
      expect(
        await this.marketPlace.getCollectionCounter()
      ).to.equal(0);
    });
  });

  describe("2. Test marketPlace setters", function () {
    it("2.1 MarketPlace change name", async function () {
      const newName = "Plutonium 2.0";
      expect(await this.marketPlace.getName()).to.be.not.equal(newName);

      const setNameTx = await this.marketPlace.setName(newName);
      await setNameTx.wait();
      const name = await this.marketPlace.getName();

      expect(name).to.equal(newName);
      expect(name).not.to.equal("");
      expect(name).not.to.equal(null);
      expect(name).not.to.equal(undefined);
    });

    it("2.2 MarketPlace revert change empty name", async function () {
      await expect(
        this.marketPlace.setName("")
      ).to.be.reverted;
    });

    it("2.3 MarketPlace revert change name from incorrect account", async function () {
      await expect(
        this.marketPlace.connect(this.buyer).setName("Bla-Bla")
      ).to.be.reverted;
    });

    it("2.4 MarketPlace change fee", async function () {
      const marketFee = ethers.utils.parseEther("2.5");
      expect(
        await this.marketPlace.getFee()
      ).to.equal(marketFee);

      const newMarketFee = ethers.utils.parseEther("2.25");
      const setFeeTx = await this.marketPlace.setFee(newMarketFee);
      await setFeeTx.wait();

      expect(
        await this.marketPlace.getFee()
      ).to.equal(newMarketFee);
    });

    it("2.5 MarketPlace revert change zero fee", async function () {
      await expect(
        this.marketPlace.setFee(0)
      ).to.be.reverted;
    });

    it("2.6 MarketPlace revert change fee from incorrect account", async function () {
      await expect(
        this.marketPlace.connect(this.buyer).setFee(10)
      ).to.be.reverted;
    });
  });

  describe("3. Test marketPlace collections contract getters", function () {
    it("3.1 Collection contract should have address", async function () {
      const address = this.collection.address;
      expect(address).not.to.equal("");
      expect(address).not.to.equal(0x0);
      expect(address).not.to.equal(null);
      expect(address).not.to.equal(undefined);
    });
    it("3.2 Collection contract have name", async function () {
      expect(
        await this.collection.name()
      ).to.be.equal("Monsters");
    });
    it("3.2 Collection contract have symbol", async function () {
      expect(
        await this.collection.symbol()
      ).to.be.equal("MST");
    });
  });

  describe("4. Test marketPlace collection", function () {
    it("4.1 MarketPlace createCollection", async function () {
      const name        = await this.collection.name();
      const symbol      = await this.collection.symbol();
      const description = "My Monster Collection";
      const fee         = ethers.utils.parseEther("4.25"); 

      const tx = await this.marketPlace
          .connect(this.owner)
          .createCollection(
            name,
            symbol,
            description,
            fee,
            this.collection.address,
            this.owner.address
          );

      await tx.wait();

      const collectionId = await this.marketPlace.getCollectionCounter();
      expect(collectionId).to.be.equal(1);

      let collection = await this.marketPlace.getCollection(collectionId);

      expect(collection.name).to.equal(name);
      expect(collection.symbol).to.equal(symbol);
      expect(collection.description).to.equal(description);
      expect(collection.nftCollection).to.equal(this.collection.address);
      expect(collection.owner).to.equal(this.owner.address);
      expect(collection.creator).to.equal(this.owner.address);
      expect(collection.isApproved).to.equal(true); // approved by default
      expect(collection.isLocked).to.equal(false);

      expect(await this.collection.totalSupply()).to.equal(0); // no tokens in collection
    });

    it("4.2 MarketPlace collection safeMint by owner", async function () {
      const token = await this.collection
      .connect(this.owner)
      .safeMint("testURI-1");

      await token.wait();

      expect(await this.collection.totalSupply()).to.equal(1);
    });

    it("4.3 MarketPlace collection safeMint by seller", async function () {
      const token = await this.collection
      .connect(this.seller)
      .safeMint("testURI-2");

      await token.wait();

      expect(await this.collection.totalSupply()).to.equal(2);
    });

    it("4.4 MarketPlace collection safeMint by buyer", async function () {
      const token = await this.collection
      .connect(this.buyer)
      .safeMint("testURI-3");

      await token.wait();

      expect(await this.collection.totalSupply()).to.equal(3);
    });

    it("4.5 MarketPlace collection safeMint by author", async function () {
      const token = await this.collection
      .connect(this.author)
      .safeMint("testURI-4");

      await token.wait();

      expect(await this.collection.totalSupply()).to.equal(4);
    });

    it("4.6 MarketPlace balances before create collectibles. All tokens are belong to their creators", async function () {
      
      // check token balance before create collectible
      expect(await this.collection.balanceOf(this.owner.address)).to.be.equal(1);
      expect(await this.collection.balanceOf(this.seller.address)).to.be.equal(1);
      expect(await this.collection.balanceOf(this.buyer.address)).to.be.equal(1);
      expect(await this.collection.balanceOf(this.author.address)).to.be.equal(1);
      expect(await this.collection.balanceOf(this.marketPlace.address)).to.be.equal(0);

      expect(await this.collection.ownerOf(1)).to.be.equal(this.owner.address);
      expect(await this.collection.ownerOf(2)).to.be.equal(this.seller.address);
      expect(await this.collection.ownerOf(3)).to.be.equal(this.buyer.address);
      expect(await this.collection.ownerOf(4)).to.be.equal(this.author.address);

      let ownerBalance  = await ethers.provider.getBalance(this.owner.address);
      let sellerBalance = await ethers.provider.getBalance(this.seller.address);
      let buyerBalance  = await ethers.provider.getBalance(this.buyer.address);
      let authorBalance  = await ethers.provider.getBalance(this.author.address);
      let marketPlaceBalance = await ethers.provider.getBalance(this.marketPlace.address);

      // some balance was used for gas
      expect(this.ownerBalance).to.be.greaterThan(ownerBalance);
      expect(Math.floor(+ethers.utils.formatEther(ownerBalance))).to.be.equal(9999);
      this.ownerBalance = ownerBalance;

      expect(this.sellerBalance).to.be.greaterThan(sellerBalance);
      expect(Math.floor(+ethers.utils.formatEther(sellerBalance))).to.be.equal(9999);
      this.sellerBalance = sellerBalance;

      expect(this.buyerBalance).to.be.greaterThan(buyerBalance);
      expect(Math.floor(+ethers.utils.formatEther(buyerBalance))).to.be.equal(9999);
      this.buyerBalance = buyerBalance;

      expect(this.authorBalance).to.be.greaterThan(authorBalance);
      expect(Math.floor(+ethers.utils.formatEther(authorBalance))).to.be.equal(9999);
      this.authorBalance = authorBalance ;

      expect(Math.floor(+ethers.utils.formatEther(marketPlaceBalance))).to.be.equal(0);
      expect(this.marketPlaceBalance).to.be.equal(marketPlaceBalance);
    });

    it("4.7 MarketPlace editCollection", async function () {
      const name = await this.collection.name();
      const symbol = await this.collection.symbol();
      const description = "My Cutiest Creatures";
      const fee = ethers.utils.parseEther("0.4");
     
      const collectionId = await this.marketPlace.getCollectionIdByName(name);
      const collectionBeforeEdit = await this.marketPlace.getCollection(collectionId);
      expect(collectionBeforeEdit.name).to.be.equal(name);
      expect(collectionBeforeEdit.symbol).to.be.equal(symbol);

      const tx = await this.marketPlace
        .connect(this.owner)
        .editCollection(
          collectionId,
          name,
          symbol,
          description,
          fee,
          this.collection.address,
          this.owner.address,
          true,
          false
        );
      await tx.wait();

      const collectionIdAfterEdit = await this.marketPlace.getCollectionIdByName(name);
      const collectionAfterEdit = await this.marketPlace.getCollection((collectionIdAfterEdit))
      expect(collectionAfterEdit.name).to.be.equal(name);
      expect(collectionAfterEdit.symbol).to.be.equal(symbol);
      expect(collectionAfterEdit.description).to.be.equal(description);
      expect(collectionAfterEdit.fee).to.be.equal(fee);
    });
  });

  describe("5. Test marketPlace collectibles", function () {
    it("5.1 MarketPlace balances before create collectibles. All tokens are belong to their creators", async function () {
      expect(await this.collection.totalSupply()).to.be.equal(4);
      
      expect(await this.collection.balanceOf(this.owner.address)).to.be.equal(1);
      expect(await this.collection.balanceOf(this.seller.address)).to.be.equal(1);
      expect(await this.collection.balanceOf(this.buyer.address)).to.be.equal(1);
      expect(await this.collection.balanceOf(this.author.address)).to.be.equal(1);

      expect(await this.collection.balanceOf(this.marketPlace.address)).to.be.equal(0);

      expect(await this.collection.ownerOf(1)).to.be.equal(this.owner.address);

      expect(await this.collection.ownerOf(2)).to.be.equal(this.seller.address);
      expect(await this.collection.ownerOf(3)).to.be.equal(this.buyer.address);
      expect(await this.collection.ownerOf(4)).to.be.equal(this.author.address);
    });
    
    it("5.2 MarketPlace owner createCollectible from first token", async function () {
      const collection = await this.marketPlace.getCollection(1);

      const collectionId = await this.marketPlace.getCollectionIdByName(collection.name);

      const collectibleCountInCollection = await this.marketPlace.getCollectibleCount(collectionId);

      expect(collectibleCountInCollection).to.be.equal(0);

      await this.collection.connect(this.owner)
        .setApprovalForAll(this.marketPlace.address, true);

      const CONSTANT_PRICE = 500.5;
      
      const price = BigNumber.from((CONSTANT_PRICE * Number(ethers.constants.WeiPerEther.toString())).toString());

      let createTx = await this.marketPlace
        .connect(this.owner)
        .createCollectible([1], collectionId, false, price, { from: this.owner.address });
      
      await createTx.wait();
          
      expect(await this.marketPlace.getCollectibleCount(collectionId)).to.be.equal(1);
    });

    it("5.3 MarketPlace moves tokens after createCollectible. Token moved from owner to marketplace", async function () {
      expect(await this.collection.totalSupply()).to.be.equal(4);

      expect(await this.collection.balanceOf(this.owner.address)).to.be.equal(0);

      expect(await this.collection.balanceOf(this.seller.address)).to.be.equal(1);
      expect(await this.collection.balanceOf(this.buyer.address)).to.be.equal(1);
      expect(await this.collection.balanceOf(this.author.address)).to.be.equal(1);
      expect(await this.collection.balanceOf(this.marketPlace.address)).to.be.equal(1);

      expect(await this.collection.ownerOf(1)).to.be.equal(this.marketPlace.address);
    });

    it("5.4 MarketPlace getCollectible", async function () {
      const collectible = await this.marketPlace.getCollectible(1, 1);
      const CONSTANT_PRICE = 500.5;
      
      const price = BigNumber.from((CONSTANT_PRICE * Number(ethers.constants.WeiPerEther.toString())).toString());

      expect(collectible.owners.length).to.be.equal(collectible.tokenIds.length);

      for (let owner of collectible.owners) {
        expect(owner).to.be.equal(this.owner.address);
      }
      
      expect(collectible.tokenIds.length).to.be.equal(1);
      expect(collectible.fulfilled.length).to.be.equal(collectible.tokenIds.length);
      expect(collectible.creator).to.be.equal(collectible.owners[0]);
      expect(collectible.isAuction).to.be.equal(false);
      expect(collectible.price).to.be.equal(price);

      for (let fulfilled of collectible.fulfilled) {
        expect(fulfilled).to.be.equal(false);
      }
    });

    it("5.5 MarketPlace collection balance check before buy operation", async function () {
      expect(await this.collection.totalSupply()).to.be.equal(4);
      expect(await this.collection.balanceOf(this.owner.address)).to.be.equal(0); 
      expect(await this.collection.balanceOf(this.seller.address)).to.be.equal(1); 
      expect(await this.collection.balanceOf(this.buyer.address)).to.be.equal(1); 
      expect(await this.collection.balanceOf(this.author.address)).to.be.equal(1); 
      expect(await this.collection.balanceOf(this.marketPlace.address)).to.be.equal(1); 

      expect(await this.collection.ownerOf(1)).to.be.equal(this.marketPlace.address);

      expect(
        await this.marketPlace.getUserFunds(this.owner.address)
      ).to.be.equal(0);

      expect(
        await this.marketPlace.getUserFunds(this.buyer.address)
      ).to.be.equal(0);

      expect(
        await this.marketPlace.getUserFunds(this.seller.address)
      ).to.be.equal(0);

      expect(
        await this.marketPlace.getUserFunds(this.marketPlace.address)
      ).to.be.equal(0);
    });
    
    it("5.6 MarketPlace buy collectible by buyer from owner", async function () {
      
      const collection = await this.marketPlace.getCollection(1);
      
      let collectible = await this.marketPlace.getCollectible(1, 1);

      const quantity = 1;

      const fee = +collection.fee.toString() / +ethers.constants.WeiPerEther.toString();
      
      const percent = +collectible.price.toString() * fee / 100; 
      
      const total = +collectible.price.toString() + +percent;
     
      let tx = await this.marketPlace.connect(this.buyer).buy(collectible.collectionId, collectible.id, quantity, {
        value: BigNumber.from((total * quantity).toString())
      });
      await tx.wait();

      collectible = await this.marketPlace.getCollectible(1, 1); 

      expect(collectible.isAuction).to.be.equal(false);

      for (const owner of collectible.owners) {
        expect(owner).to.be.equal(this.buyer.address);
      }

      for (let fulfilled of collectible.fulfilled) {
        expect(fulfilled).to.be.equal(true);;
      }
      expect(collectible.creator).to.be.equal(this.owner.address);
    });
    
    it("5.7 MarketPlace collection balance check after buy collectible by buyer from owner", async function () {
      const collectible = await this.marketPlace.getCollectible(1, 1);
      
      expect(await this.collection.totalSupply()).to.be.equal(4);

      expect(await this.collection.balanceOf(this.owner.address)).to.be.equal(0); 
      expect(await this.collection.balanceOf(this.seller.address)).to.be.equal(1); 
      expect(await this.collection.balanceOf(this.buyer.address)).to.be.equal(2); 
      expect(await this.collection.balanceOf(this.author.address)).to.be.equal(1); 
      expect(await this.collection.balanceOf(this.marketPlace.address)).to.be.equal(0); 

      expect(await this.collection.ownerOf(1)).to.be.equal(this.buyer.address);

      expect(
        await this.marketPlace.getUserFunds(this.owner.address)
      ).to.be.equal(collectible.price);

      expect(
        await this.marketPlace.getUserFunds(this.buyer.address)
      ).to.be.equal(0);

      expect(
        await this.marketPlace.getUserFunds(this.seller.address)
      ).to.be.equal(0);

      expect(
        await this.marketPlace.getUserFunds(this.author.address)
      ).to.be.equal(0);

      expect(
        await this.marketPlace.getUserFunds(this.marketPlace.address)
      ).to.be.equal(0);
      
    });
    
    it("5.8 MarketPlace userFunds after buy collectible by buyer from owner", async function () {
      const collectible = await this.marketPlace.getCollectible(1, 1);
      const quantity = 1;
      const funds = await this.marketPlace.getUserFunds(this.owner.address);

      expect(funds).to.be.equal(collectible.price.mul(quantity));

      expect(await this.collection.balanceOf(this.marketPlace.address)).to.be.equal(0);
      expect(await this.collection.balanceOf(this.owner.address)).to.be.equal(0);
      expect(await this.collection.balanceOf(this.seller.address)).to.be.equal(1);
      expect(await this.collection.balanceOf(this.buyer.address)).to.be.equal(2);
      expect(await this.collection.balanceOf(this.author.address)).to.be.equal(1);
    });

    it("5.9 MarketPlace claimFunds", async function () {
      const collectible = await this.marketPlace.getCollectible(1, 1);

      let ownerBalance = await ethers.provider.getBalance(this.owner.address);
      let sellerBalance = await ethers.provider.getBalance(this.seller.address);
      let buyerBalance  = await ethers.provider.getBalance(this.buyer.address);
      let authorBalance  = await ethers.provider.getBalance(this.author.address);
      let marketPlaceBalance = await ethers.provider.getBalance(this.marketPlace.address);

      console.log("\t######################### Before Claim Funds after buy token for " + ethers.utils.formatEther(collectible.price) + " ################################");
      console.log("\tOwner balance:", ethers.utils.formatEther(ownerBalance));
      console.log("\tBuyer balance:", ethers.utils.formatEther(buyerBalance));
      console.log("\tSeller balance:", ethers.utils.formatEther(sellerBalance));
      console.log("\tAuthor balance:", ethers.utils.formatEther(authorBalance));
      console.log("\tMarket balance:", ethers.utils.formatEther(marketPlaceBalance));

      this.ownerBalance = ownerBalance;
      this.buyerBalance = buyerBalance;
      this.sellerBalance = sellerBalance;
      this.authorBalance = authorBalance;
      this.marketPlaceBalance = marketPlaceBalance;
      
      const quantity = 1;
      const tx = await this.marketPlace.connect(this.owner).claimFunds();
      await tx.wait();

      ownerBalance = await ethers.provider.getBalance(this.owner.address);
      sellerBalance = await ethers.provider.getBalance(this.seller.address);
      buyerBalance  = await ethers.provider.getBalance(this.buyer.address);
      authorBalance  = await ethers.provider.getBalance(this.author.address);
      marketPlaceBalance = await ethers.provider.getBalance(this.marketPlace.address);

      console.log("\t######################### After Claim Funds ################################");
      console.log("\tOwner balance:", ethers.utils.formatEther(ownerBalance));
      console.log("\tBuyer balance:", ethers.utils.formatEther(buyerBalance));
      console.log("\tSeller balance:", ethers.utils.formatEther(sellerBalance));
      console.log("\tAuthor balance:", ethers.utils.formatEther(authorBalance));
      console.log("\tMarket balance:", ethers.utils.formatEther(marketPlaceBalance));

      
      expect(Math.floor(+ethers.utils.formatEther(sellerBalance))).to.be.equal(9999);
      expect(Math.floor(+ethers.utils.formatEther(buyerBalance))).to.be.equal(9497); // balance decreased
      expect(Math.floor(+ethers.utils.formatEther(authorBalance))).to.be.equal(9999);
      expect(+ethers.utils.formatEther(marketPlaceBalance)).to.be.equal(0);

      expect(Math.floor(+ethers.utils.formatEther(ownerBalance)))
        .to.be.equal(Math.floor(+ethers.utils.formatEther(this.ownerBalance.add(collectible.price))));

      expect(this.marketPlaceBalance.sub(marketPlaceBalance)).to.be.equal(collectible.price);  

      expect(sellerBalance).to.be.equal(this.sellerBalance);
      expect(authorBalance).to.be.equal(this.authorBalance);
      

      this.ownerBalance = ownerBalance;
      this.buyerBalance = buyerBalance;
      this.sellerBalance = sellerBalance;
      this.authorBalance = authorBalance;
      this.marketPlaceBalance = marketPlaceBalance; 
      
      expect(
        await this.marketPlace.getUserFunds(this.owner.address)
      ).to.be.equal(0);

      expect(
        await this.marketPlace.getUserFunds(this.buyer.address)
      ).to.be.equal(0);

      expect(
        await this.marketPlace.getUserFunds(this.seller.address)
      ).to.be.equal(0);
      
      expect(
        await this.marketPlace.getUserFunds(this.author.address)
      ).to.be.equal(0);

      expect(
        await this.marketPlace.getUserFunds(this.marketPlace.address)
      ).to.be.equal(0);
    });

    it("5.10 MarketPlace author wants to sell collectible belongs to buyer (reverted)", async function () {
      expect(await this.collection.totalSupply()).to.be.equal(4);
      
      const collectible = await this.marketPlace.getCollectible(1, 1);

      expect(collectible.tokenIds.length).to.be.equal(1);
      expect(collectible.owners[0]).to.be.equal(this.buyer.address);
      expect(collectible.fulfilled[0]).to.be.equal(true);
      expect(collectible.creator).to.be.equal(this.owner.address);

      const quantityToSell = 1;
      
      await expect(this.marketPlace.connect(this.author).sell(1, collectible.id, quantityToSell)).to.be.revertedWith("Can sell only tokens that belongs to owner");
    });

    it("5.11 MarketPlace buyer wants to sell collectible belongs to buyer", async function () {
      expect(await this.collection.totalSupply()).to.be.equal(4);
      
      expect(await this.collection.balanceOf(this.owner.address)).to.be.equal(0); 
      expect(await this.collection.balanceOf(this.buyer.address)).to.be.equal(2); 
      expect(await this.collection.balanceOf(this.seller.address)).to.be.equal(1); 
      expect(await this.collection.balanceOf(this.author.address)).to.be.equal(1); 
      expect(await this.collection.balanceOf(this.marketPlace.address)).to.be.equal(0); 

      let collectible = await this.marketPlace.getCollectible(1, 1);

      expect(collectible.tokenIds.length).to.be.equal(1);
      expect(collectible.owners[0]).to.be.equal(this.buyer.address);
      expect(collectible.fulfilled[0]).to.be.equal(true);
      expect(collectible.creator).to.be.equal(this.owner.address);

      const quantityToSell = 1;
      
      await this.collection.connect(this.buyer)
        .setApprovalForAll(this.marketPlace.address, true);

      const tx = await this.marketPlace.connect(this.buyer).sell(1, collectible.id, quantityToSell);

      await tx.wait();
      
      collectible = await this.marketPlace.getCollectible(1, 1);

      // all sold
      for (let i = 0; i < quantityToSell; i++) {
        expect(collectible.owners[i]).to.be.equal(this.buyer.address); // after sell, set new price and reset fulfilled
        expect(collectible.fulfilled[i]).to.be.equal(false);
      }      
    });
  
    it("5.12 MarketPlace collection balance check after sell operation", async function () {
      expect(await this.collection.totalSupply()).to.be.equal(4);
      expect(await this.collection.balanceOf(this.owner.address)).to.be.equal(0); 
      expect(await this.collection.balanceOf(this.seller.address)).to.be.equal(1); 
      expect(await this.collection.balanceOf(this.buyer.address)).to.be.equal(1); 
      expect(await this.collection.balanceOf(this.author.address)).to.be.equal(1); 
      expect(await this.collection.balanceOf(this.marketPlace.address)).to.be.equal(1); 

      expect(await this.collection.ownerOf(1)).to.be.equal(this.marketPlace.address);
    });
    
    it("5.13 MarketPlace seller is buying sold collectibles", async function () {
      const collection = await this.marketPlace.getCollection(1);

      expect(await this.collection.totalSupply()).to.be.equal(4);
      
      let collectible = await this.marketPlace.getCollectible(1, 1);

      expect(collectible.tokenIds.length).to.be.equal(1);
      expect(collectible.owners[0]).to.be.equal(this.buyer.address);
      expect(collectible.fulfilled[0]).to.be.equal(false);
      expect(collectible.creator).to.be.equal(this.owner.address);

    
      const quantity = 1;

      const fee = +collection.fee.toString() / +ethers.constants.WeiPerEther.toString();
      
      const percent = +collectible.price.toString() * fee / 100; 
      
      const total = +collectible.price.toString() + +percent;
     
      let tx = await this.marketPlace.connect(this.seller).buy(collectible.collectionId, collectible.id, quantity, {
        value: BigNumber.from((total * quantity).toString())
      });

      await tx.wait();

      collectible = await this.marketPlace.getCollectible(1, 1); 

      expect(collectible.isAuction).to.be.equal(false);

      for (const owner of collectible.owners) {
        expect(owner).to.be.equal(this.seller.address);
      }

      for (let fulfilled of collectible.fulfilled) {
        expect(fulfilled).to.be.equal(true);;
      }
      expect(collectible.creator).to.be.equal(this.owner.address);
    });
    
    it("5.14 MarketPlace userFunds after buy collectible by seller from buyer", async function () {
      const collectible = await this.marketPlace.getCollectible(1, 1);
 
      expect(await this.collection.balanceOf(this.marketPlace.address)).to.be.equal(0);
      expect(await this.collection.balanceOf(this.owner.address)).to.be.equal(0);
      expect(await this.collection.balanceOf(this.seller.address)).to.be.equal(2);
      expect(await this.collection.balanceOf(this.buyer.address)).to.be.equal(1);
      expect(await this.collection.balanceOf(this.author.address)).to.be.equal(1);

      expect(
        await this.marketPlace.getUserFunds(this.owner.address)
      ).to.be.equal(0);

      expect(
        await this.marketPlace.getUserFunds(this.buyer.address)
      ).to.be.equal(collectible.price);

      expect(
        await this.marketPlace.getUserFunds(this.seller.address)
      ).to.be.equal(0);

      expect(
        await this.marketPlace.getUserFunds(this.author.address)
      ).to.be.equal(0);

      expect(
        await this.marketPlace.getUserFunds(this.marketPlace.address)
      ).to.be.equal(0);

      let ownerBalance = await ethers.provider.getBalance(this.owner.address);
      let sellerBalance = await ethers.provider.getBalance(this.seller.address);
      let buyerBalance  = await ethers.provider.getBalance(this.buyer.address);
      let authorBalance  = await ethers.provider.getBalance(this.author.address);
      let marketPlaceBalance = await ethers.provider.getBalance(this.marketPlace.address);

      console.log("\t######################### Before Claim Funds after buy token by seller for " + ethers.utils.formatEther(collectible.price) + " ################################");
      console.log("\tOwner balance:", ethers.utils.formatEther(ownerBalance));
      console.log("\tBuyer balance:", ethers.utils.formatEther(buyerBalance));
      console.log("\tSeller balance:", ethers.utils.formatEther(sellerBalance));
      console.log("\tAuthor balance:", ethers.utils.formatEther(authorBalance));
      console.log("\tMarket balance:", ethers.utils.formatEther(marketPlaceBalance));

      this.ownerBalance = ownerBalance;
      this.buyerBalance = buyerBalance;
      this.sellerBalance = sellerBalance;
      this.authorBalance = authorBalance;
      this.marketPlaceBalance = marketPlaceBalance;
      
      const quantity = 1;
      const tx = await this.marketPlace.connect(this.buyer).claimFunds();
      await tx.wait();

      ownerBalance = await ethers.provider.getBalance(this.owner.address);
      sellerBalance = await ethers.provider.getBalance(this.seller.address);
      buyerBalance  = await ethers.provider.getBalance(this.buyer.address);
      authorBalance  = await ethers.provider.getBalance(this.author.address);
      marketPlaceBalance = await ethers.provider.getBalance(this.marketPlace.address);

      console.log("\t######################### After Claim Funds ################################");
      console.log("\tOwner balance:", ethers.utils.formatEther(ownerBalance));
      console.log("\tBuyer balance:", ethers.utils.formatEther(buyerBalance));
      console.log("\tSeller balance:", ethers.utils.formatEther(sellerBalance));
      console.log("\tAuthor balance:", ethers.utils.formatEther(authorBalance));
      console.log("\tMarket balance:", ethers.utils.formatEther(marketPlaceBalance));

      
      expect(Math.floor(+ethers.utils.formatEther(sellerBalance))).to.be.equal(9497);
      expect(Math.floor(+ethers.utils.formatEther(buyerBalance))).to.be.equal(9997);
      expect(Math.floor(+ethers.utils.formatEther(authorBalance))).to.be.equal(9999);
      expect(+ethers.utils.formatEther(marketPlaceBalance)).to.be.equal(0);

      // expect(Math.floor(+ethers.utils.formatEther(ownerBalance)))
      //   .to.be.equal(Math.floor(+ethers.utils.formatEther(this.ownerBalance.add(collectible.price))));

      expect(this.marketPlaceBalance.sub(marketPlaceBalance)).to.be.equal(collectible.price);  

      expect(sellerBalance).to.be.equal(this.sellerBalance);
      expect(authorBalance).to.be.equal(this.authorBalance);
      

      this.ownerBalance = ownerBalance;
      this.buyerBalance = buyerBalance;
      this.sellerBalance = sellerBalance;
      this.authorBalance = authorBalance;
      this.marketPlaceBalance = marketPlaceBalance; 
      
      expect(
        await this.marketPlace.getUserFunds(this.owner.address)
      ).to.be.equal(0);

      expect(
        await this.marketPlace.getUserFunds(this.buyer.address)
      ).to.be.equal(0);

      expect(
        await this.marketPlace.getUserFunds(this.seller.address)
      ).to.be.equal(0);

      expect(
        await this.marketPlace.getUserFunds(this.author.address)
      ).to.be.equal(0);

      expect(
        await this.marketPlace.getUserFunds(this.marketPlace.address)
      ).to.be.equal(0);
    }); 
  });
    
  describe("6. MarketPlace multiple tokens collectible", function () {
    
    it("6.1 MarketPlace check created tokens in collection", async function () {
      expect(await this.marketPlace.getCollectionCounter()).to.be.equal(1);
      expect(await this.collection.totalSupply()).to.be.equal(4);
      expect(await this.marketPlace.getCollectibleCount(1)).to.be.equal(1);

      expect(await this.collection.balanceOf(this.owner.address)).to.be.equal(0); 
      expect(await this.collection.balanceOf(this.seller.address)).to.be.equal(2); 
      expect(await this.collection.balanceOf(this.buyer.address)).to.be.equal(1); 
      expect(await this.collection.balanceOf(this.author.address)).to.be.equal(1); 
      expect(await this.collection.balanceOf(this.marketPlace.address)).to.be.equal(0); 
    });
    
    it("6.2 MarketPlace author mint 100 tokens", async function () {
      expect(await this.collection.totalSupply()).to.be.equal(4);

      const tokenTx = await this.collection
      .connect(this.author)
      .mint("multiple-testURI", 100);
        
      await tokenTx.wait();

      expect(await this.collection.totalSupply()).to.be.equal(104);

      expect(await this.collection.balanceOf(this.owner.address)).to.be.equal(0);
      expect(await this.collection.balanceOf(this.buyer.address)).to.be.equal(1);
      expect(await this.collection.balanceOf(this.seller.address)).to.be.equal(2);
      expect(await this.collection.balanceOf(this.author.address)).to.be.equal(101); // owner of multiple created tokens
      expect(await this.collection.balanceOf(this.marketPlace.address)).to.be.equal(0);
    });
    
    it("6.3 MarketPlace create collectible from 100 minted tokens", async function () {
      expect(await this.collection.totalSupply()).to.be.equal(104);
      const multipleTokenIds = [];
    
      for (let i = 5; i <= await this.collection.totalSupply(); i++) {
        expect(await this.collection.ownerOf(i)).to.be.equal(this.author.address);
        multipleTokenIds.push(i);
      }
      const collectionId = 1;

      let collectiblesInCollection = await this.marketPlace.getCollectibleCount(collectionId);

      expect(collectiblesInCollection).to.be.equal(1);
      
      const itemId = collectiblesInCollection.add(1);

      await this.collection.connect(this.author)
        .setApprovalForAll(this.marketPlace.address, true);

      const price = BigNumber.from((9.5 * +ethers.constants.WeiPerEther.toString()).toString());
      
      let createTx = await this.marketPlace
        .connect(this.author)
        .createCollectible(multipleTokenIds, collectionId, false, price, { from: this.author.address });
      await createTx.wait();
    
      collectiblesInCollection = await this.marketPlace.getCollectibleCount(collectionId);

      expect(collectiblesInCollection).to.be.equal(2);

      const collectible = await this.marketPlace.getCollectible(collectionId, itemId);
      
      expect(collectible.tokenIds.length).to.be.equal(100);
      expect(collectible.fulfilled.filter((_fulfilled: boolean) => _fulfilled === false).length).to.be.equal(100);
      expect(collectible.owners.filter((owner: string) => owner === this.author.address).length).to.be.equal(100);

      expect(
        await this.marketPlace.getUserFunds(this.owner.address)
      ).to.be.equal(0);

      expect(
        await this.marketPlace.getUserFunds(this.buyer.address)
      ).to.be.equal(0);

      expect(
        await this.marketPlace.getUserFunds(this.seller.address)
      ).to.be.equal(0);

      expect(
        await this.marketPlace.getUserFunds(this.author.address)
      ).to.be.equal(0);

      expect(
        await this.marketPlace.getUserFunds(this.marketPlace.address)
      ).to.be.equal(0);
    });

    it("6.4 MarketPlace buyer buy collectible belongs to author with part of 100 minted tokens", async function () {

      expect(await this.collection.balanceOf(this.owner.address)).to.be.equal(0);
      expect(await this.collection.balanceOf(this.buyer.address)).to.be.equal(1);
      expect(await this.collection.balanceOf(this.seller.address)).to.be.equal(2);
      expect(await this.collection.balanceOf(this.author.address)).to.be.equal(1); // owner of multiple created tokens
      expect(await this.collection.balanceOf(this.marketPlace.address)).to.be.equal(100);

      const collection = await this.marketPlace.getCollection(1);
      
      let collectible = await this.marketPlace.getCollectible(1, 2);

      expect(collectible.tokenIds.length).to.be.equal(100);
      expect(collectible.fulfilled.filter((_fulfilled: boolean) => _fulfilled === false).length).to.be.equal(100);
      expect(collectible.owners.filter((owner: string) => owner === this.author.address).length).to.be.equal(100);

      const quantity = 10;
      const fee = +collection.fee.toString() / +ethers.constants.WeiPerEther.toString();
      const percent = +collectible.price.toString() * fee / 100;
      const total = (+percent + +collectible.price) * quantity;

      let tx = await this.marketPlace.connect(this.buyer).buy(1, collectible.id, quantity, {
        value: BigNumber.from(total.toString())
      });

      await tx.wait();

      collectible = await this.marketPlace.getCollectible(1, 2);

      expect(collectible.tokenIds.length).to.be.equal(100);
      expect(collectible.fulfilled.filter((_fulfilled: boolean) => _fulfilled === true).length).to.be.equal(quantity);
      expect(collectible.owners.filter((owner: string) => owner === this.buyer.address).length).to.be.equal(quantity);

      expect(await this.collection.balanceOf(this.owner.address)).to.be.equal(0);
      expect(await this.collection.balanceOf(this.buyer.address)).to.be.equal(11);
      expect(await this.collection.balanceOf(this.seller.address)).to.be.equal(2);
      expect(await this.collection.balanceOf(this.author.address)).to.be.equal(1); // owner of multiple created tokens
      expect(await this.collection.balanceOf(this.marketPlace.address)).to.be.equal(90);

      expect(
        await this.marketPlace.getUserFunds(this.owner.address)
      ).to.be.equal(0);

      expect(
        await this.marketPlace.getUserFunds(this.buyer.address)
      ).to.be.equal(0);

      expect(
        await this.marketPlace.getUserFunds(this.seller.address)
      ).to.be.equal(0);

      expect(
        await this.marketPlace.getUserFunds(this.author.address)
      ).to.be.equal(collectible.price.mul(quantity));

      expect(
        await this.marketPlace.getUserFunds(this.marketPlace.address)
      ).to.be.equal(0);
    });

    it("6.5 MarketPlace seller buy author collectible belongs to author with part of 100 minted tokens", async function () {
      expect(await this.collection.balanceOf(this.owner.address)).to.be.equal(0);
      expect(await this.collection.balanceOf(this.buyer.address)).to.be.equal(11);
      expect(await this.collection.balanceOf(this.seller.address)).to.be.equal(2);
      expect(await this.collection.balanceOf(this.author.address)).to.be.equal(1); // owner of multiple created tokens
      expect(await this.collection.balanceOf(this.marketPlace.address)).to.be.equal(90);

      const collection = await this.marketPlace.getCollection(1);
      
      let collectible = await this.marketPlace.getCollectible(1, 2);

      expect(collectible.tokenIds.length).to.be.equal(100);
      expect(collectible.fulfilled.filter((_fulfilled: boolean) => _fulfilled === false).length).to.be.equal(90);
      expect(collectible.owners.filter((owner: string) => owner === this.author.address).length).to.be.equal(90);

      const quantity = 70;
      const fee = +collection.fee.toString() / +ethers.constants.WeiPerEther.toString();
      const percent = +collectible.price.toString() * fee / 100;
      const total = (+percent + +collectible.price) * quantity;

      let tx = await this.marketPlace.connect(this.seller).buy(1, collectible.id, quantity, {
        value: BigNumber.from(total.toString())
      });

      await tx.wait();

      collectible = await this.marketPlace.getCollectible(1, 2);

      expect(collectible.tokenIds.length).to.be.equal(100);
      expect(collectible.fulfilled.filter((_fulfilled: boolean) => _fulfilled === true).length).to.be.equal(quantity + 10);
      expect(collectible.owners.filter((owner: string) => owner === this.seller.address).length).to.be.equal(quantity);

      expect(await this.collection.balanceOf(this.owner.address)).to.be.equal(0);
      expect(await this.collection.balanceOf(this.buyer.address)).to.be.equal(11);
      expect(await this.collection.balanceOf(this.seller.address)).to.be.equal(72);
      expect(await this.collection.balanceOf(this.author.address)).to.be.equal(1); // owner of multiple created tokens
      expect(await this.collection.balanceOf(this.marketPlace.address)).to.be.equal(20);

      expect(
        await this.marketPlace.getUserFunds(this.owner.address)
      ).to.be.equal(0);

      expect(
        await this.marketPlace.getUserFunds(this.buyer.address)
      ).to.be.equal(0);

      expect(
        await this.marketPlace.getUserFunds(this.seller.address)
      ).to.be.equal(0);

      expect(
        await this.marketPlace.getUserFunds(this.author.address)
      ).to.be.equal(collectible.price.mul((quantity + 10)));

      expect(
        await this.marketPlace.getUserFunds(this.marketPlace.address)
      ).to.be.equal(0);
    });
    
    it("6.6 MarketPlace buy collectible belongs to author with part of 100 minted tokens", async function () {

      expect(await this.collection.balanceOf(this.owner.address)).to.be.equal(0);
      expect(await this.collection.balanceOf(this.buyer.address)).to.be.equal(11);
      expect(await this.collection.balanceOf(this.seller.address)).to.be.equal(72);
      expect(await this.collection.balanceOf(this.author.address)).to.be.equal(1); // owner of multiple created tokens
      expect(await this.collection.balanceOf(this.marketPlace.address)).to.be.equal(20);

      const collection = await this.marketPlace.getCollection(1);
      
      let collectible = await this.marketPlace.getCollectible(1, 2);

      expect(collectible.tokenIds.length).to.be.equal(100);
      expect(collectible.fulfilled.filter((_fulfilled: boolean) => _fulfilled === false).length).to.be.equal(20);
      expect(collectible.owners.filter((owner: string) => owner === this.author.address).length).to.be.equal(20);

      const quantity = 20;
      const fee = +collection.fee.toString() / +ethers.constants.WeiPerEther.toString();
      const percent = +collectible.price.toString() * fee / 100;
      const total = (+percent + +collectible.price) * quantity;

      let tx = await this.marketPlace.connect(this.buyer).buy(1, collectible.id, quantity, {
        value: BigNumber.from(total.toString())
      });

      await tx.wait();

      collectible = await this.marketPlace.getCollectible(1, 2);

      expect(collectible.tokenIds.length).to.be.equal(100);
      expect(collectible.fulfilled.filter((_fulfilled: boolean) => _fulfilled === true).length).to.be.equal(100);
      expect(collectible.owners.filter((owner: string) => owner === this.seller.address).length).to.be.equal(70);
      expect(collectible.owners.filter((owner: string) => owner === this.buyer.address).length).to.be.equal(30);

      expect(await this.collection.balanceOf(this.owner.address)).to.be.equal(0);
      expect(await this.collection.balanceOf(this.buyer.address)).to.be.equal(31);
      expect(await this.collection.balanceOf(this.seller.address)).to.be.equal(72);
      expect(await this.collection.balanceOf(this.author.address)).to.be.equal(1); // owner of multiple created tokens
      expect(await this.collection.balanceOf(this.marketPlace.address)).to.be.equal(0);

      expect(
        await this.marketPlace.getUserFunds(this.owner.address)
      ).to.be.equal(0);

      expect(
        await this.marketPlace.getUserFunds(this.buyer.address)
      ).to.be.equal(0);

      expect(
        await this.marketPlace.getUserFunds(this.seller.address)
      ).to.be.equal(0);

      expect(
        await this.marketPlace.getUserFunds(this.author.address)
      ).to.be.equal(collectible.price.mul(100));

      expect(
        await this.marketPlace.getUserFunds(this.marketPlace.address)
      ).to.be.equal(0);
    });

    it("6.7 MarketPlace need to sell collectible before convert to auction", async function () {
      let collectible = await this.marketPlace.getCollectible(1, 2);
      expect(await this.collection.balanceOf(this.owner.address)).to.be.equal(0);
      expect(await this.collection.balanceOf(this.buyer.address)).to.be.equal(31);
      expect(await this.collection.balanceOf(this.seller.address)).to.be.equal(72);
      expect(await this.collection.balanceOf(this.author.address)).to.be.equal(1); // owner of multiple created tokens
      expect(await this.collection.balanceOf(this.marketPlace.address)).to.be.equal(0);

      let quantityToSell = 30;
      
      await this.collection.connect(this.buyer)
        .setApprovalForAll(this.marketPlace.address, true);

      let tx = await this.marketPlace.connect(this.buyer).sell(1, collectible.id, quantityToSell);

      await tx.wait();

      expect(await this.collection.balanceOf(this.owner.address)).to.be.equal(0);
      expect(await this.collection.balanceOf(this.buyer.address)).to.be.equal(1);
      expect(await this.collection.balanceOf(this.seller.address)).to.be.equal(72);
      expect(await this.collection.balanceOf(this.author.address)).to.be.equal(1); // owner of multiple created tokens
      expect(await this.collection.balanceOf(this.marketPlace.address)).to.be.equal(30);

      quantityToSell = 70;
      
      await this.collection.connect(this.seller)
        .setApprovalForAll(this.marketPlace.address, true);

      tx = await this.marketPlace.connect(this.seller).sell(1, collectible.id, quantityToSell);

      await tx.wait();

      expect(await this.collection.balanceOf(this.owner.address)).to.be.equal(0);
      expect(await this.collection.balanceOf(this.buyer.address)).to.be.equal(1);
      expect(await this.collection.balanceOf(this.seller.address)).to.be.equal(2);
      expect(await this.collection.balanceOf(this.author.address)).to.be.equal(1); // owner of multiple created tokens
      expect(await this.collection.balanceOf(this.marketPlace.address)).to.be.equal(100);
    });

    it("6.8 MarketPlace need to sell collectible before convert to auction", async function () {
      let collectible = await this.marketPlace.getCollectible(1, 2);
    
      const CONSTANT_PRICE = 800.5;
      
      const price = BigNumber.from((CONSTANT_PRICE * Number(ethers.constants.WeiPerEther.toString())).toString());
      
      const tx = await this.marketPlace.editCollectible(1, collectible.id, price, false, true);
      await tx.wait();
      collectible = await this.marketPlace.getCollectible(1, 2);
      
      expect(collectible.price).to.be.equal(price);
      expect(collectible.isAuction).to.be.equal(true);
      expect(collectible.fulfilled.filter((_fulfilled: boolean) => _fulfilled === false).length).to.be.equal(100);
    });

    // it("6.8 MarketPlace change collectible type to auction", async function () {
    //   let collectible = await this.marketPlace.getCollectible(1, 2);
    //   console.log(collectible);
    //   const tx = await this.marketPlace.editCollectible(1, collectible.id, false, true);
    //   await tx.wait();
    //   collectible = await this.marketPlace.getCollectible(1, 2);
    //   console.log(collectible);
    // }); 
     
  });
});

