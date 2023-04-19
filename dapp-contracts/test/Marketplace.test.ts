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
    try {
      const marketName = "Ploutonion";
      const marketFee = ethers.utils.parseEther("2.5");

      const [owner, seller, buyer, author] = await ethers.getSigners();

      const MarketplaceFactory = await ethers.getContractFactory("Marketplace", owner);
      const marketPlace = await MarketplaceFactory.deploy(marketName, marketFee);
      await marketPlace.deployed();

      const CollectionFactory = await ethers.getContractFactory("NFTCollection", owner);

      const collection1Name = "Monsters";
      const collection1Symbol = "MST";

      const collection1 = await CollectionFactory.deploy(collection1Name, collection1Symbol);
      await collection1.deployed();

      const collection2Name = "Samurai";
      const collection2Symbol = "SMR";

      const collection2 = await CollectionFactory.deploy(collection2Name, collection2Symbol);
      await collection2.deployed();

      const AuctionFactory = await ethers.getContractFactory("NFTAuction", owner);

      return { owner, seller, buyer, author, marketPlace, collection1, collection2, AuctionFactory }

    } catch(e) {
      throw e;
    }
  }

  before(async function () {
    try {
      const { owner, seller, buyer, author, marketPlace, collection1, collection2, AuctionFactory } = await loadFixture(getFixtures);

      this.owner = owner;
      this.seller = seller;
      this.buyer = buyer;
      this.author = author;
      this.marketPlace = marketPlace;
      this.collection1 = collection1;
      this.collection2 = collection2;
      this.AuctionFactory = AuctionFactory;
    } catch (e) {
      console.error(e);
    }
  });

  // nest describe calls to create subsections.
  describe("Deployment Market", function () {
    it("1. Should have address", async function () {
      try {
        const address = this.marketPlace.address;
        expect(address).not.to.equal("");
        expect(address).not.to.equal(0x0);
        expect(address).not.to.equal(null);
        expect(address).not.to.equal(undefined);
      } catch (e) {
        console.error(e);
      }
    });

    it("2. Should have name", async function () {
      try {
        const name = await this.marketPlace.getName();
        expect(name).not.to.equal("");
        expect(name).not.to.equal(null);
        expect(name).not.to.equal(undefined);
        expect(name).to.equal("Ploutonion");
      } catch (e) {
        console.error(e);
      }
    });

    it("3. Should have fee", async function () {
      try {
        const fee = await this.marketPlace.getFee();
        expect(fee).not.to.equal(0);
        expect(fee).to.equal(ethers.utils.parseEther("2.5"));
      } catch (e) {
        console.error(e);
      }
    });

    it("4. Should have owner", async function () {
      // This test expects the owner variable stored in the contract to be
      // equal to our Signer's owner.
      expect(await this.marketPlace.getOwner()).to.equal(this.owner.address);
    });

    it("5. Should change name", async function () {
      try {
        const setNameTx = await this.marketPlace.setName("Plutonium 2.0");
        await setNameTx.wait();
        const name = await this.marketPlace.getName();

        expect(name).to.equal("Plutonium 2.0");
        expect(name).not.to.equal("");
        expect(name).not.to.equal(null);
        expect(name).not.to.equal(undefined);
      } catch (e) {
        console.error(e);
      }
    });

    it("6. Should revert empty name", async function () {
      await expect(
        this.marketPlace.setName("")
      ).to.be.revertedWith("name should be not empty");
    });

    it("7. Should revert name with no owner", async function () {
      await expect(
        this.marketPlace.connect(this.buyer).setName("")
      ).to.be.revertedWith("only owner can change market name");
    });

    it("8. Should revert zero fee", async function () {
      await expect(
        this.marketPlace.setFee(0)
      ).to.be.revertedWith("market fee should be greater than zero");
    });

    it("9. Should revert fee with no owner", async function () {
      await expect(
        this.marketPlace.connect(this.buyer).setFee(0)
      ).to.be.revertedWith("only owner can change market fee");
    });

    it("10. Should change fee", async function () {
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

    it("11. Should have no collections", async function () {
      expect(
        await this.marketPlace.getCollectionCounter()
      ).to.equal(0);
    });

    it("12. Should have no funds on market balance", async function () {
      expect(
        await this.marketPlace.getUserFunds(this.owner.address)
      ).to.be.equal(0);

      expect(
        await this.marketPlace.getUserFunds(this.buyer.address)
      ).to.be.equal(0);

      expect(
        await this.marketPlace.getUserFunds(this.seller.address)
      ).to.be.equal(0);
    });
  });

  describe("Deployment Collections", function () {
    it("1. New collection should have address", async function () {
      try {
        const address = this.collection1.address;
        expect(address).not.to.equal("");
        expect(address).not.to.equal(0x0);
        expect(address).not.to.equal(null);
        expect(address).not.to.equal(undefined);
      } catch (e) {
        console.error(e);
      }
    });

    it("2. Mint collection 1 after deploy", async function() {
      await (async () => {
        // 4. Mint Collection
        expect(
          await this.collection1.name()
        ).to.be.equal("Monsters");

        expect(
          await this.collection1.symbol()
        ).to.be.equal("MST");

        const name = await this.collection1.name();
        const symbol = await this.collection1.symbol();
        const description = "My Cuties";
        const fee = ethers.utils.parseEther("1.25");
        const price = 100;

        const tx = await this.marketPlace
          .connect(this.owner)
          .createCollection(
            name,
            symbol,
            description,
            fee,
            price,
            this.collection1.address,
            this.owner.address
          );

        await tx.wait();
        const id = 1;
        expect(
          await this.marketPlace.getCollectionCounter()
        ).to.equal(id);

        let collection = await this.marketPlace.getCollection(id);

        expect(collection.name).to.equal(name);
        expect(collection.symbol).to.equal(symbol);
        expect(collection.description).to.equal(description);
        expect(collection.nftCollection).to.equal(this.collection1.address);
        expect(collection.owner).to.equal(this.owner.address);
        expect(collection.creator).to.equal(this.owner.address);
        expect(collection.isApproved).to.equal(false);
        expect(collection.isLocked).to.equal(false);
      })();
      await (async () => {
        // 4. Mint Collection
        expect(
          await this.collection2.name()
        ).to.be.equal("Samurai");

        expect(
          await this.collection2.symbol()
        ).to.be.equal("SMR");

        const name   = await this.collection2.name();
        const symbol = await this.collection2.symbol();
        const description = "My Anime";
        const fee = ethers.utils.parseEther("4.25");
        const price = 1000;

        const tx = await this.marketPlace
          .connect(this.owner)
          .createCollection(
            name,
            symbol,
            description,
            fee,
            price,
            this.collection2.address,
            this.owner.address
          );

        await tx.wait();
        const id = 2;
        expect(
          await this.marketPlace.getCollectionCounter()
        ).to.equal(id);

        let collection = await this.marketPlace.getCollection(id);

        expect(collection.name).to.equal(name);
        expect(collection.symbol).to.equal(symbol);
        expect(collection.description).to.equal(description);
        expect(collection.nftCollection).to.equal(this.collection2.address);
        expect(collection.owner).to.equal(this.owner.address);
        expect(collection.creator).to.equal(this.owner.address);
        expect(collection.isApproved).to.equal(false);
        expect(collection.isLocked).to.equal(false);

      })();

      expect(await this.marketPlace.getCollectionCounter()).to.equal(2);
      expect(await this.collection1.totalSupply()).to.equal(0);
      expect(await this.collection2.totalSupply()).to.equal(0);

      await(async () => {
        const token = await this.collection1
          .connect(this.owner)
          .safeMint("testURI-1");

        await token.wait();

        expect(await this.collection1.totalSupply()).to.equal(1);
      })();

      await(async () => {
        const token = await this.collection1
          .connect(this.buyer)
          .safeMint("testURI-2");

        await token.wait();

        expect(await this.collection1.totalSupply()).to.equal(2);
      })();

      await(async () => {
        const token = await this.collection1
          .connect(this.seller)
          .safeMint("testURI-3");

        await token.wait();

        expect(await this.collection1.totalSupply()).to.equal(3);
      })();

      await(async () => {
        const token = await this.collection2
          .connect(this.owner)
          .safeMint("testURI-1");

        await token.wait();

        expect(await this.collection2.totalSupply()).to.equal(1);
      })();

      await(async () => {
        const token = await this.collection2
          .connect(this.buyer)
          .safeMint("testURI-2");

        await token.wait();

        expect(await this.collection2.totalSupply()).to.equal(2);
      })();

      await(async () => {
        const token = await this.collection2
          .connect(this.seller)
          .safeMint("testURI-3");

        await token.wait();

        expect(await this.collection2.totalSupply()).to.equal(3);
      })();

      expect(await this.collection1.totalSupply()).to.equal(3);
      expect(await this.collection2.totalSupply()).to.equal(3);

      // check token balance before create collectible
      expect(await this.collection1.balanceOf(this.owner.address)).to.be.equal(1);
      expect(await this.collection1.balanceOf(this.buyer.address)).to.be.equal(1);
      expect(await this.collection1.balanceOf(this.seller.address)).to.be.equal(1);

      expect(await this.collection1.ownerOf(1)).to.be.equal(this.owner.address);
      expect(await this.collection1.ownerOf(2)).to.be.equal(this.buyer.address);
      expect(await this.collection1.ownerOf(3)).to.be.equal(this.seller.address);

      expect(await this.collection2.balanceOf(this.owner.address)).to.be.equal(1);
      expect(await this.collection2.balanceOf(this.buyer.address)).to.be.equal(1);
      expect(await this.collection2.balanceOf(this.seller.address)).to.be.equal(1);

      expect(await this.collection2.ownerOf(1)).to.be.equal(this.owner.address);
      expect(await this.collection2.ownerOf(2)).to.be.equal(this.buyer.address);
      expect(await this.collection2.ownerOf(3)).to.be.equal(this.seller.address);

      let ownerBalance  = await ethers.provider.getBalance(this.owner.address);
      let sellerBalance = await ethers.provider.getBalance(this.seller.address);
      let buyerBalance  = await ethers.provider.getBalance(this.buyer.address);
      let authorBalance  = await ethers.provider.getBalance(this.author.address);

      expect(Math.floor(+ethers.utils.formatEther(ownerBalance))).to.be.equal(9999);
      expect(Math.floor(+ethers.utils.formatEther(sellerBalance))).to.be.equal(9999);
      expect(Math.floor(+ethers.utils.formatEther(buyerBalance))).to.be.equal(9999);
      expect(Math.floor(+ethers.utils.formatEther(authorBalance))).to.be.equal(10000);


      const name = await this.collection1.name();
      const symbol = await this.collection1.symbol();
      const description = "My Cutiest Creatures";
      const fee = ethers.utils.parseEther("4");
      const price = 1000;
      const collectionId = await this.marketPlace.getCollectionIdByName(name);
      const collectionBeforeEdit = await this.marketPlace.getCollection(collectionId);
      expect(collectionBeforeEdit.name).to.be.equal(name);
      expect(collectionBeforeEdit.symbol).to.be.equal(symbol);

      // test edit collection
      const tx = await this.marketPlace
        .connect(this.owner)
        .editCollection(
          collectionId,
          name,
          symbol,
          description,
          fee,
          price,
          this.collection1.address,
          this.owner.address
        );
      await tx.wait();

      const collectionIdAfterEdit = await this.marketPlace.getCollectionIdByName(name);
      const collectionAfterEdit = await this.marketPlace.getCollection((collectionIdAfterEdit))
      expect(collectionAfterEdit.name).to.be.equal(name);
      expect(collectionAfterEdit.symbol).to.be.equal(symbol);
      expect(collectionAfterEdit.description).to.be.equal(description);
      expect(collectionAfterEdit.fee).to.be.equal(fee);
      expect(collectionAfterEdit.price).to.be.equal(price);

      // test create collectible
      // ####################################################################

      await(async () => {
        const collection = await this.marketPlace.getCollection(1);

        const collectionId = await this.marketPlace.getCollectionIdByName(collection.name);

        //   name: 'Monsters',
        //   symbol: 'MST',
        //   description: 'My Cutiest Creatures',
        //   nftCollection: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
        //   fee: BigNumber { value: "4000000000000000000" },
        //   price: BigNumber { value: "1000" },
        //   owner: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
        //   creator: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
        //   isApproved: false,
        //   isLocked: false

        const startTime = moment().unix();
        const endTime = moment().add(3, 'days').unix();

        const startPrice = ethers.utils.parseEther("1.2");
        const reservePrice = ethers.utils.parseEther("1.5");

        const collectibleCountInCollection = await this.marketPlace.getCollectibleCount(collectionId);

        expect(collectibleCountInCollection).to.be.equal(0);
        const itemId = collectibleCountInCollection.add(1);

        const auction = await this.AuctionFactory.deploy(this.marketPlace.address,
          collectionId, itemId, startPrice, reservePrice, startTime, endTime);

        await auction.deployed();

        expect(collection.owner).to.be.equal(this.owner.address);
        expect(await auction.beneficiary()).to.be.equal(collection.owner);

        await this.collection1.connect(this.owner)
          .setApprovalForAll(this.marketPlace.address, true);

        let createTx = await this.marketPlace
          .connect(this.owner)
          .createCollectible([1], collectionId, true, auction.address, { from: this.owner.address });
        await createTx.wait();

        expect(await this.marketPlace.getCollectibleCount(collectionId)).to.be.equal(1);

        // token moved from owner to marketplace after creating collectible
        expect(await this.collection1.balanceOf(this.owner.address)).to.be.equal(0);
        expect(await this.collection1.balanceOf(this.marketPlace.address)).to.be.equal(1);
        expect(await this.collection1.ownerOf(1)).to.be.equal(this.marketPlace.address);

        // check balances before auction
        let ownerBalance  = await ethers.provider.getBalance(this.owner.address);
        let sellerBalance = await ethers.provider.getBalance(this.seller.address);
        let buyerBalance  = await ethers.provider.getBalance(this.buyer.address);
        let authorBalance  = await ethers.provider.getBalance(this.author.address);

        expect(Math.floor(+ethers.utils.formatEther(ownerBalance))).to.be.equal(9999);
        expect(Math.floor(+ethers.utils.formatEther(sellerBalance))).to.be.equal(9999);
        expect(Math.floor(+ethers.utils.formatEther(buyerBalance))).to.be.equal(9999);
        expect(Math.floor(+ethers.utils.formatEther(authorBalance))).to.be.equal(10000);

        const collectible = await this.marketPlace.getCollectible(1, 1);
        expect(collectible.isAuction).to.be.equal(true);
        expect(collectible.owner).to.be.equal(this.owner.address);
        expect(collectible.creator).to.be.equal(this.owner.address);
        expect(collectible.nftAuction).to.be.equal(auction.address);

        const auctionStartTime = await auction.auctionStartTime();
        const auctionEndTime = await auction.auctionEndTime();
        const now = moment(new Date()).unix();
        expect(auctionEndTime.toNumber()).greaterThan(now);
        //console.log(now, new Date(now * 1000));
        //console.log(auctionStartTime.toNumber(), new Date(auctionStartTime.toNumber() * 1000));
        //console.log(auctionEndTime.toNumber(), new Date(auctionEndTime.toNumber() * 1000));
        expect(await auction.collectionId()).to.be.equal(collectionId);
        expect(await auction.highestBid()).to.be.equal(0);
        expect(await auction.highestBidder()).to.be.equal("0x0000000000000000000000000000000000000000");
        expect(await auction.isStarted()).to.be.equal(false);
        expect(await auction.isEnded()).to.be.equal(false);

        expect(await auction.itemId()).to.be.equal(collectible.id);

        expect(await auction.isStarted()).to.be.equal(false);

        const tx = await this.marketPlace.startAuction(collectible.collectionId, collectible.id);
        await tx.wait();

        expect(await auction.isStarted()).to.be.equal(true);

        // nothing changed after starting auction
        expect(await this.collection1.balanceOf(this.owner.address)).to.be.equal(0);
        expect(await this.collection1.balanceOf(this.marketPlace.address)).to.be.equal(1);

        expect(await this.collection1.ownerOf(1)).to.be.equal(this.marketPlace.address);

        const bidTx = await auction.connect(this.buyer).placeBid({ from: this.buyer.address, value: reservePrice.mul(2)});
        await bidTx.wait();

        expect(await auction.highestBidder()).to.be.equal(this.buyer.address);
        expect(await auction.highestBid()).to.be.equal(reservePrice.mul(2));

        // check balances after first bid
        // check balances after auction start
        ownerBalance  = await ethers.provider.getBalance(this.owner.address);
        sellerBalance = await ethers.provider.getBalance(this.seller.address);
        buyerBalance  = await ethers.provider.getBalance(this.buyer.address);
        authorBalance  = await ethers.provider.getBalance(this.author.address);

        expect(Math.floor(+ethers.utils.formatEther(ownerBalance))).to.be.equal(9999);
        expect(Math.floor(+ethers.utils.formatEther(sellerBalance))).to.be.equal(9999);

        // buyer balance decreased to reservePrice.mul(2) value
        expect(Math.floor(+ethers.utils.formatEther(buyerBalance))).to.be.equal(9996);
        expect(Math.floor(+ethers.utils.formatEther(authorBalance))).to.be.equal(10000);

        const bid2Tx = await auction.connect(this.seller).placeBid({ from: this.seller.address, value: reservePrice.mul(3)});
        await bid2Tx.wait();

        ownerBalance  = await ethers.provider.getBalance(this.owner.address);
        sellerBalance = await ethers.provider.getBalance(this.seller.address);
        buyerBalance  = await ethers.provider.getBalance(this.buyer.address);
        authorBalance  = await ethers.provider.getBalance(this.author.address);

        expect(Math.floor(+ethers.utils.formatEther(ownerBalance))).to.be.equal(9999);

        // seller balance descreased, because was made made bid
        expect(Math.floor(+ethers.utils.formatEther(sellerBalance))).to.be.equal(9995);

        // buyer balance return because there is another bid hiher = to reservePrice.mul(3) value
        expect(Math.floor(+ethers.utils.formatEther(buyerBalance))).to.be.equal(9999);
        expect(Math.floor(+ethers.utils.formatEther(authorBalance))).to.be.equal(10000);

        expect(await auction.highestBidder()).to.be.equal(this.seller.address);
        expect(await auction.highestBid()).to.be.equal(reservePrice.mul(3));

        const bid3Tx = await auction.connect(this.author).placeBid({ from: this.author.address, value: reservePrice.mul(4)});
        await bid3Tx.wait();

        ownerBalance  = await ethers.provider.getBalance(this.owner.address);
        sellerBalance = await ethers.provider.getBalance(this.seller.address);
        buyerBalance  = await ethers.provider.getBalance(this.buyer.address);
        authorBalance  = await ethers.provider.getBalance(this.author.address);

        expect(Math.floor(+ethers.utils.formatEther(ownerBalance))).to.be.equal(9999);

        // seller balance increased, because somebody  was made made bid
        expect(Math.floor(+ethers.utils.formatEther(sellerBalance))).to.be.equal(9999);

        // buyer balance return because there is another bid hiher = to reservePrice.mul(3) value
        expect(Math.floor(+ethers.utils.formatEther(buyerBalance))).to.be.equal(9999);

        // author balance descreased, because was made made bid
        expect(Math.floor(+ethers.utils.formatEther(authorBalance))).to.be.equal(9993);

        expect(await auction.highestBidder()).to.be.equal(this.author.address);
        expect(await auction.highestBid()).to.be.equal(reservePrice.mul(4));

        const endTx = await this.marketPlace.endAuction(collectionId, collectible.id);
        await endTx.wait();

        expect(await auction.isStarted()).to.be.equal(false);
        expect(await auction.isEnded()).to.be.equal(true);

        expect(await this.collection1.balanceOf(this.owner.address)).to.be.equal(0);
        expect(await this.collection1.balanceOf(this.buyer.address)).to.be.equal(1);
        expect(await this.collection1.balanceOf(this.seller.address)).to.be.equal(1);
        expect(await this.collection1.balanceOf(this.author.address)).to.be.equal(0); // winner
        expect(await this.collection1.balanceOf(this.marketPlace.address)).to.be.equal(1);

        expect(await this.collection1.ownerOf(1)).to.be.equal(this.marketPlace.address);

        ownerBalance  = await ethers.provider.getBalance(this.owner.address);
        sellerBalance = await ethers.provider.getBalance(this.seller.address);
        buyerBalance  = await ethers.provider.getBalance(this.buyer.address);
        authorBalance  = await ethers.provider.getBalance(this.author.address);

        // owner received auction.highestBid()
        expect(Math.floor(+ethers.utils.formatEther(ownerBalance))).to.be.equal(10005);

        // seller balance increased, because somebody  was made made bid
        expect(Math.floor(+ethers.utils.formatEther(sellerBalance))).to.be.equal(9999);

        // buyer balance return because there is another bid higher = to reservePrice.mul(3) value
        expect(Math.floor(+ethers.utils.formatEther(buyerBalance))).to.be.equal(9999);

        // author balance descreased, because was made made bid
        expect(Math.floor(+ethers.utils.formatEther(authorBalance))).to.be.equal(9993);
      })();

      await(async () => {
        expect(await this.collection1.totalSupply()).to.equal(3);
        expect(await this.collection1.balanceOf(this.owner.address)).to.be.equal(0);
        expect(await this.collection1.balanceOf(this.buyer.address)).to.be.equal(1);
        expect(await this.collection1.balanceOf(this.seller.address)).to.be.equal(1);
        expect(await this.collection1.balanceOf(this.author.address)).to.be.equal(0);
        expect(await this.collection1.balanceOf(this.marketPlace.address)).to.be.equal(1);

        const token = await this.collection1
          .connect(this.seller)
          .mint("testURI-multiple", 100);

        await token.wait();

        expect(await this.collection1.totalSupply()).to.equal(103);
        expect(await this.collection1.balanceOf(this.owner.address)).to.be.equal(0);
        expect(await this.collection1.balanceOf(this.buyer.address)).to.be.equal(1);
        expect(await this.collection1.balanceOf(this.seller.address)).to.be.equal(101);
        expect(await this.collection1.balanceOf(this.author.address)).to.be.equal(0);
        expect(await this.collection1.balanceOf(this.marketPlace.address)).to.be.equal(1);

      })();

      // mint 100 tokens

      let previousTotalSupply = await this.collection1.totalSupply();
      let token = await this.collection1
        .connect(this.owner)
        .mint("testURIMultiple", 100);

      let result = await token.wait();

      let totalSupply = await this.collection1.totalSupply();

      expect(totalSupply).to.equal(previousTotalSupply.add(100));
      expect(result.to).to.be.equal(this.collection1.address);
      expect(result.from).to.be.equal(this.owner.address);

      // owner now has a lot of tokens in contract
      expect(await this.collection1.balanceOf(this.owner.address)).to.be.equal(100);
      expect(await this.collection1.balanceOf(this.marketPlace.address)).to.be.equal(1);
      const tokenIds = result.events.map((event: {
        args: {
          tokenId: number;
        }
      }) => event.args.tokenId);
      expect(tokenIds.length).to.be.equal(100);

      expect(await this.collection1.totalSupply()).to.equal(203);
      expect(await this.collection1.balanceOf(this.owner.address)).to.be.equal(100);
      expect(await this.collection1.balanceOf(this.buyer.address)).to.be.equal(1);
      expect(await this.collection1.balanceOf(this.seller.address)).to.be.equal(101);
      expect(await this.collection1.balanceOf(this.author.address)).to.be.equal(0);
      expect(await this.collection1.balanceOf(this.marketPlace.address)).to.be.equal(1);

      let collectiblePriceWei = ethers.utils.parseUnits("0.25", "ether");

      expect(collectiblePriceWei).to.be.equal("250000000000000000");

      const collection = await this.marketPlace.getCollection(1);
      expect(collectionId).to.be.equal(1);
      expect(await this.marketPlace.getCollectibleCount(collectionId)).to.be.equal(1);

      //   console.log(collection);
      //   id: BigNumber { value: "1" },
      //   name: 'Monsters',
      //   symbol: 'MST',
      //   description: 'My Cutiest Creatures',
      //   nftCollection: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
      //   fee: BigNumber { value: "4000000000000000000" },
      //   price: BigNumber { value: "1000" },
      //   owner: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
      //   creator: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
      //   fulfilled: false,
      //   cancelled: false

      const startTime = moment().unix();
      const endTime = moment().add(3, 'days').unix();

      const startPrice = ethers.utils.parseEther("1.2");
      const reservePrice = ethers.utils.parseEther("1.5");

      const auction = await this.AuctionFactory.deploy(this.marketPlace.address,
        collectionId, 1, startPrice, reservePrice, startTime, endTime);
      await auction.deployed();

      expect(collection.owner).to.be.equal(this.owner.address);
      expect(await auction.beneficiary()).to.be.equal(collection.owner);

      await this.collection1.connect(this.owner)
        .setApprovalForAll(this.marketPlace.address, true);

      let createTx = await this.marketPlace
        .connect(this.owner)
        .createCollectible(tokenIds, collectionId, true, auction.address, { from: this.owner.address });

      result = await createTx.wait();

      expect(result.to).to.be.equal(this.marketPlace.address);
      expect(result.from).to.be.equal(this.owner.address);

      // // after add token to market balance must change (token is going to market)
      expect(await this.collection1.totalSupply()).to.equal(203);
      expect(await this.collection1.balanceOf(this.owner.address)).to.be.equal(0);
      expect(await this.collection1.balanceOf(this.buyer.address)).to.be.equal(1);
      expect(await this.collection1.balanceOf(this.seller.address)).to.be.equal(101);
      expect(await this.collection1.balanceOf(this.author.address)).to.be.equal(0);
      expect(await this.collection1.balanceOf(this.marketPlace.address)).to.be.equal(101);
      for (const tokenId of tokenIds) {
        expect(await this.collection1.ownerOf(tokenId)).to.be.equal(this.marketPlace.address);
      }

      const collectibleId = await this.marketPlace.getCollectibleCount(collectionId);
      expect(collectibleId).to.be.equal(2);

      const collectible = await this.marketPlace.getCollectible(collectionId, collectibleId);

      // ###################################################


      /*
      // ----------------------------------------------
      startTime = moment().unix();
      endTime = moment().add(3, 'days').unix();

      startPrice = ethers.utils.parseEther("1.2");
      reservePrice = ethers.utils.parseEther("1.5");

      auction = await this.AuctionFactory.deploy(
        collection1.id, 2, startPrice, reservePrice, startTime, endTime, this.buyer.address);
      await auction.deployed();

      expect(await auction.beneficiary()).to.be.equal(this.buyer.address);

      await this.collection1.connect(this.buyer)
        .setApprovalForAll(this.marketPlace.address, true);

      createTx = await this.marketPlace
        .connect(this.buyer)
        .createCollectible(2, collection1.id, true, auction.address, { from: this.buyer.address });

      await createTx.wait();

      // ----------------------------------------------
      startTime = moment().unix();
      endTime = moment().add(3, 'days').unix();

      startPrice = ethers.utils.parseEther("1.2");
      reservePrice = ethers.utils.parseEther("1.5");

      auction = await this.AuctionFactory.deploy(
        collection1.id, 3, startPrice, reservePrice, startTime, endTime, this.seller.address);
      await auction.deployed();

      expect(await auction.beneficiary()).to.be.equal(this.seller.address);

      await this.collection1.connect(this.seller)
        .setApprovalForAll(this.marketPlace.address, true);

      createTx = await this.marketPlace
        .connect(this.seller)
        .createCollectible(3, collection1.id, true, auction.address, { from: this.seller.address });

      await createTx.wait();

      // ----------------------------------------------
      const collection2 = await this.marketPlace.getCollection(2);
      expect(collection2.id).to.be.equal(2);

      startTime = moment().unix();
      endTime = moment().add(3, 'days').unix();

      startPrice = ethers.utils.parseEther("1.2");
      reservePrice = ethers.utils.parseEther("1.5");

      auction = await this.AuctionFactory.deploy(
        collection2.id, 1, startPrice, reservePrice, startTime, endTime, this.owner.address);
      await auction.deployed();

      expect(await auction.beneficiary()).to.be.equal(this.owner.address);

      await this.collection2.connect(this.owner)
        .setApprovalForAll(this.marketPlace.address, true);

      createTx = await this.marketPlace
        .connect(this.owner)
        .createCollectible(1, collection2.id, false, auction.address, { from: this.owner.address });

      await createTx.wait();

      // ----------------------------------------------
      startTime = moment().unix();
      endTime = moment().add(3, 'days').unix();

      startPrice = ethers.utils.parseEther("1.2");
      reservePrice = ethers.utils.parseEther("1.5");

      auction = await this.AuctionFactory.deploy(
        collection2.id, 2, startPrice, reservePrice, startTime, endTime, this.buyer.address);
      await auction.deployed();

      expect(await auction.beneficiary()).to.be.equal(this.buyer.address);

      await this.collection2.connect(this.buyer)
        .setApprovalForAll(this.marketPlace.address, true);

      createTx = await this.marketPlace
        .connect(this.buyer)
        .createCollectible(2, collection2.id, false, auction.address, { from: this.buyer.address });

      await createTx.wait();

      // ----------------------------------------------
      startTime = moment().unix();
      endTime = moment().add(3, 'days').unix();

      startPrice = ethers.utils.parseEther("1.2");
      reservePrice = ethers.utils.parseEther("1.5");

      auction = await this.AuctionFactory.deploy(
        collection2.id, 3, startPrice, reservePrice, startTime, endTime, this.seller.address);
      await auction.deployed();

      expect(await auction.beneficiary()).to.be.equal(this.seller.address);

      await this.collection2.connect(this.seller)
        .setApprovalForAll(this.marketPlace.address, true);

      createTx = await this.marketPlace
        .connect(this.seller)
        .createCollectible(3, collection2.id, false, auction.address, { from: this.seller.address });

      await createTx.wait();

      expect(await this.marketPlace.getCollectibleCount(1)).to.be.equal(3);
      expect(await this.marketPlace.getCollectibleCount(2)).to.be.equal(3);

      expect(await this.collection1.balanceOf(this.owner.address)).to.be.equal(0);
      expect(await this.collection1.balanceOf(this.buyer.address)).to.be.equal(0);
      expect(await this.collection1.balanceOf(this.seller.address)).to.be.equal(0);

      expect(await this.collection1.balanceOf(this.marketPlace.address)).to.be.equal(3);

      expect(await this.collection1.ownerOf(1)).to.be.equal(this.marketPlace.address);
      expect(await this.collection1.ownerOf(2)).to.be.equal(this.marketPlace.address);
      expect(await this.collection1.ownerOf(3)).to.be.equal(this.marketPlace.address);

      expect(await this.collection2.balanceOf(this.owner.address)).to.be.equal(0);
      expect(await this.collection2.balanceOf(this.buyer.address)).to.be.equal(0);
      expect(await this.collection2.balanceOf(this.seller.address)).to.be.equal(0);

      expect(await this.collection2.balanceOf(this.marketPlace.address)).to.be.equal(3);

      expect(await this.collection2.ownerOf(1)).to.be.equal(this.marketPlace.address);
      expect(await this.collection2.ownerOf(2)).to.be.equal(this.marketPlace.address);
      expect(await this.collection2.ownerOf(3)).to.be.equal(this.marketPlace.address);
      */

      //####################################################################

      /*
      await(async () => {
        const collectible = await this.marketPlace.getCollectible(1, 2);
        expect(collectible.isAuction).to.be.equal(true);
        expect(collectible.owner).to.be.equal(this.buyer.address);
        expect(collectible.creator).to.be.equal(this.buyer.address);

        const tx = await this.marketPlace.connect(this.buyer).startAuction(collectible.collectionId, collectible.tokenId);
        await tx.wait();

      })();

      await(async () => {
        const collectible = await this.marketPlace.getCollectible(1, 3);
        expect(collectible.isAuction).to.be.equal(true);
        expect(collectible.owner).to.be.equal(this.seller.address);
        expect(collectible.creator).to.be.equal(this.seller.address);

        const tx = await this.marketPlace.connect(this.seller).startAuction(collectible.collectionId, collectible.tokenId);
        await tx.wait();

      })();

      await(async () => {
        const collectible = await this.marketPlace.getCollectible(2, 1);
        expect(collectible.isAuction).to.be.equal(false);
        expect(collectible.owner).to.be.equal(this.owner.address);
        expect(collectible.creator).to.be.equal(this.owner.address);
      })();

      await(async () => {
        const collectible = await this.marketPlace.getCollectible(2, 2);
        expect(collectible.isAuction).to.be.equal(false);
        expect(collectible.owner).to.be.equal(this.buyer.address);
        expect(collectible.creator).to.be.equal(this.buyer.address);
      })();

      await(async () => {
        const collectible = await this.marketPlace.getCollectible(2, 3);
        expect(collectible.isAuction).to.be.equal(false);
        expect(collectible.owner).to.be.equal(this.seller.address);
        expect(collectible.creator).to.be.equal(this.seller.address);
      })();
      */
    });
    /*
    it("10. Create new collection", async function() {
      try {
        /!*

        // 1. Create empty collection




        // 2. Deploy contract


        // SUCCESS
        let event = result.events[0].args;
        expect(event.tokenId.toNumber(), totalSupply, "id is correct");
        expect(event.from, "0x0000000000000000000000000000000000000000", "from is correct");
        expect(event.to, this.owner.address, "to is correct");


        // 6. Add token to collection
        await collectionContract1.connect(this.owner)
          .setApprovalForAll(this.marketPlace.address, true);

        let price = ethers.utils.parseUnits("1.55", "ether");


        let createTx = await this.marketPlace
          .connect(this.owner)
          .createCollectible(event.tokenId, createdCollection1.id, price, false, { from: this.owner.address });

          result = await createTx.wait();

          expect(result.to).to.be.equal(this.marketPlace.address);
          expect(result.from).to.be.equal(this.owner.address);

          let args = result.events[1].args;
          expect(args.tokenId).to.be.equal(event.tokenId);
          expect(args.collectionId).to.be.equal(createdCollection1.id);
          expect(args.owner).to.be.equal(this.owner.address);
          expect(args.creator).to.be.equal(this.owner.address);
          expect(args.fulfilled).to.be.equal( false);
          expect(args.cancelled).to.be.equal( false);
          expect(args.price).to.be.equal(price);

          // after add token to market balance must change (token is going to market)
          expect(await collectionContract1.balanceOf(this.owner.address)).to.be.equal(0);
          expect(await collectionContract1.balanceOf(this.marketPlace.address)).to.be.equal(1);

          expect(await collectionContract1.ownerOf(totalSupply)).to.be.equal(this.marketPlace.address);

          expect(await this.marketPlace.getUserFunds(this.owner.address)).to.equal(0);
          expect(await this.marketPlace.getUserFunds(this.buyer.address)).to.equal(0);
          expect(await this.marketPlace.getUserFunds(this.seller.address)).to.equal(0);

          // ###################################################

          // create second token
          token = await collectionContract1
            .connect(this.owner)
            .safeMint("testURI2");

          result = await token.wait();
          totalSupply = await collectionContract1.totalSupply();

          expect(totalSupply).to.equal(2);
          expect(result.to).to.be.equal(collectionContract1.address);
          expect(result.from).to.be.equal(this.owner.address);

          // SUCCESS
          event = result.events[0].args;
          expect(event.tokenId.toNumber(), totalSupply, "id is correct");
          expect(event.from, "0x0000000000000000000000000000000000000000", "from is correct");
          expect(event.to, this.owner.address, "to is correct");

          // owner now has 2 tokens in contract
          expect(await collectionContract1.balanceOf(this.owner.address)).to.be.equal(1);
          expect(await collectionContract1.balanceOf(this.marketPlace.address)).to.be.equal(1);

          expect(await collectionContract1.ownerOf(totalSupply)).to.be.equal(this.owner.address);

          price = ethers.utils.parseUnits("2", "ether");

          createTx = await this.marketPlace
            .connect(this.owner)
            .createCollectible(event.tokenId, createdCollection1.id, price, false, { from: this.owner.address });

          result = await createTx.wait();

          expect(result.to).to.be.equal(this.marketPlace.address);
          expect(result.from).to.be.equal(this.owner.address);

          args = result.events[1].args;
          expect(args.tokenId).to.be.equal(event.tokenId);
          expect(args.collectionId).to.be.equal(createdCollection1.id);
          expect(args.owner).to.be.equal(this.owner.address);
          expect(args.creator).to.be.equal(this.owner.address);
          expect(args.fulfilled).to.be.equal( false);
          expect(args.cancelled).to.be.equal( false);
          expect(args.price).to.be.equal(price);

          // after add token to market balance must change (token is going to market)
          expect(await collectionContract1.balanceOf(this.owner.address)).to.be.equal(0);
          expect(await collectionContract1.balanceOf(this.marketPlace.address)).to.be.equal(2);

          expect(await collectionContract1.ownerOf(totalSupply)).to.be.equal(this.marketPlace.address);

          // ###################################################

          // third token
          token = await collectionContract1
            .connect(this.owner)
            .safeMint("testURI3");

          result = await token.wait();
          totalSupply = await collectionContract1.totalSupply();

          expect(totalSupply).to.equal(3);
          expect(result.to).to.be.equal(collectionContract1.address);
          expect(result.from).to.be.equal(this.owner.address);

          // SUCCESS
          event = result.events[0].args;
          expect(event.tokenId.toNumber(), totalSupply, "id is correct");
          expect(event.from, "0x0000000000000000000000000000000000000000", "from is correct");
          expect(event.to, this.owner.address, "to is correct");

          // owner created 3 tokens in collection
          expect(await collectionContract1.balanceOf(this.owner.address)).to.be.equal(1);
          expect(await collectionContract1.balanceOf(this.marketPlace.address)).to.be.equal(2);

          expect(await collectionContract1.ownerOf(totalSupply)).to.be.equal(this.owner.address);

          price = ethers.utils.parseUnits("2", "ether");

          createTx = await this.marketPlace
            .connect(this.owner)
            .createCollectible(event.tokenId, createdCollection1.id, price, false, { from: this.owner.address });

          result = await createTx.wait();

          expect(result.to).to.be.equal(this.marketPlace.address);
          expect(result.from).to.be.equal(this.owner.address);

          args = result.events[1].args;
          expect(args.tokenId).to.be.equal(event.tokenId);
          expect(args.collectionId).to.be.equal(createdCollection1.id);
          expect(args.owner).to.be.equal(this.owner.address);
          expect(args.creator).to.be.equal(this.owner.address);
          expect(args.fulfilled).to.be.equal( false);
          expect(args.cancelled).to.be.equal( false);
          expect(args.price).to.be.equal(price);

          // after add token to market balance must change (token is going to market)
          expect(await collectionContract1.balanceOf(this.owner.address)).to.be.equal(0);
          expect(await collectionContract1.balanceOf(this.marketPlace.address)).to.be.equal(3);

          expect(await collectionContract1.ownerOf(1)).to.be.equal(this.marketPlace.address);
          expect(await collectionContract1.ownerOf(2)).to.be.equal(this.marketPlace.address);
          expect(await collectionContract1.ownerOf(3)).to.be.equal(this.marketPlace.address);

          let tokenURI = await collectionContract1.tokenURI(1);
          expect(tokenURI).to.be.equal('testURI');

          tokenURI = await collectionContract1.tokenURI(2);
          expect(tokenURI).to.be.equal('testURI2');

          tokenURI = await collectionContract1.tokenURI(3);
          expect(tokenURI).to.be.equal('testURI3');

          expect(await this.marketPlace.getUserFunds(this.owner.address)).to.equal(0);
          expect(await this.marketPlace.getUserFunds(this.buyer.address)).to.equal(0);
          expect(await this.marketPlace.getUserFunds(this.seller.address)).to.equal(0);

          // ##################### End First Collection ############################

          // ##################### Start Second Collection Created By Seller ######################
          // after create first collection, let's try to create one more collection by another user
          collectionName = "Digital";
          collectionSymbol = "DGL";
          collectionDescription = "Brand New Digital";
          collectionFee = ethers.utils.parseEther("2.25");
          collectionPrice = 100;
          let collectionContract2 = await this.CollectionFactory.deploy(collectionName, collectionSymbol);
          await collectionContract2.deployed();

          // check address
          address = collectionContract2.address;
          expect(address).not.to.equal("");
          expect(address).not.to.equal(0x0);
          expect(address).not.to.equal(null);
          expect(address).not.to.equal(undefined);

          createCollectionTx = await this.marketPlace
            .connect(this.seller)
            .createCollection(collectionName, collectionSymbol, collectionDescription, collectionFee, collectionPrice, collectionContract2.address, this.seller.address);

          await createCollectionTx.wait();

          // collection count should increase
          collectionsCount = await this.marketPlace.getCollectionsCount();
          expect(collectionsCount).to.equal(2);

          let createdCollection2 = await this.marketPlace.getCollection(collectionsCount);
          expect(createdCollection2.id).to.equal(collectionsCount);
          expect(createdCollection2.name).to.equal(collectionName);
          expect(createdCollection2.symbol).to.equal(collectionSymbol);
          expect(createdCollection2.description).to.equal(collectionDescription);
          expect(createdCollection2.nftCollection).to.equal(address);
          expect(createdCollection2.owner).to.equal(this.seller.address);
          expect(createdCollection2.creator).to.equal(this.seller.address);
          expect(createdCollection2.fulfilled).to.equal(false);
          expect(createdCollection2.cancelled).to.equal(false);

          // let's add another token to collection
          // no tokens in collection
          totalSupply = await collectionContract2.totalSupply();
          expect(totalSupply).to.equal(0);

          // after creating collection let"s create an nft and add it to collection
          token = await collectionContract2
            .connect(this.seller)
            .safeMint("testURI");

          result = await token.wait();
          totalSupply = await collectionContract2.totalSupply();

          expect(totalSupply).to.equal(1);
          expect(result.to).to.be.equal(collectionContract2.address);
          expect(result.from).to.be.equal(this.seller.address);

          // SUCCESS
          event = result.events[0].args;
          expect(event.tokenId.toNumber(), totalSupply, "id is correct");
          expect(event.from, "0x0000000000000000000000000000000000000000", "from is correct");
          expect(event.to, this.seller.address, "to is correct");

          // check token balance
          expect(await collectionContract2.balanceOf(this.owner.address)).to.be.equal(0);
          expect(await collectionContract2.balanceOf(this.marketPlace.address)).to.be.equal(0);
          expect(await collectionContract2.balanceOf(this.seller.address)).to.be.equal(1); // token minted by seller

          expect(await collectionContract2.ownerOf(totalSupply)).to.be.equal(this.seller.address);

          // 6. Add token to collection
          await collectionContract2.connect(this.seller)
            .setApprovalForAll(this.marketPlace.address, true);

          price = ethers.utils.parseUnits("1.56", "ether");

          createTx = await this.marketPlace
            .connect(this.seller)
            .createCollectible(event.tokenId, createdCollection2.id, price, false, { from: this.seller.address });

          result = await createTx.wait();

          expect(result.to).to.be.equal(this.marketPlace.address);
          expect(result.from).to.be.equal(this.seller.address);

          args = result.events[1].args;
          expect(args.tokenId).to.be.equal(event.tokenId);
          expect(args.collectionId).to.be.equal(createdCollection2.id);
          expect(args.owner).to.be.equal(this.seller.address);
          expect(args.creator).to.be.equal(this.seller.address);
          expect(args.fulfilled).to.be.equal( false);
          expect(args.cancelled).to.be.equal( false);
          expect(args.price).to.be.equal(price);

          // after add token to market balance must change (token is going to market)
          expect(await collectionContract2.balanceOf(this.owner.address)).to.be.equal(0);
          expect(await collectionContract2.balanceOf(this.seller.address)).to.be.equal(0);
          expect(await collectionContract2.balanceOf(this.marketPlace.address)).to.be.equal(1); // token transfered to market

          expect(await collectionContract2.ownerOf(totalSupply)).to.be.equal(this.marketPlace.address);

          token = await collectionContract2
            .connect(this.seller)
            .safeMint("testURI2");

          result = await token.wait();
          totalSupply = await collectionContract2.totalSupply();

          expect(totalSupply).to.equal(2);
          expect(result.to).to.be.equal(collectionContract2.address);
          expect(result.from).to.be.equal(this.seller.address);

          // SUCCESS
          event = result.events[0].args;
          expect(event.tokenId.toNumber(), totalSupply, "id is correct");
          expect(event.from, "0x0000000000000000000000000000000000000000", "from is correct");
          expect(event.to, this.seller.address, "to is correct");

          // check token balance
          expect(await collectionContract2.balanceOf(this.owner.address)).to.be.equal(0);
          expect(await collectionContract2.balanceOf(this.seller.address)).to.be.equal(1);
          expect(await collectionContract2.balanceOf(this.marketPlace.address)).to.be.equal(1);

          expect(await collectionContract2.ownerOf(totalSupply)).to.be.equal(this.seller.address);

          // 6. Add token to collection

          price = ethers.utils.parseUnits("2", "ether");

          createTx = await this.marketPlace
            .connect(this.seller)
            .createCollectible(event.tokenId, createdCollection2.id, price, false, { from: this.seller.address });

          result = await createTx.wait();

          expect(result.to).to.be.equal(this.marketPlace.address);
          expect(result.from).to.be.equal(this.seller.address);

          args = result.events[1].args;
          expect(args.tokenId).to.be.equal(event.tokenId);
          expect(args.collectionId).to.be.equal(createdCollection2.id);
          expect(args.owner).to.be.equal(this.seller.address);
          expect(args.creator).to.be.equal(this.seller.address);
          expect(args.fulfilled).to.be.equal( false);
          expect(args.cancelled).to.be.equal( false);
          expect(args.price).to.be.equal(price);

          // after add token to market balance must change (token is going to market)
          expect(await collectionContract2.balanceOf(this.owner.address)).to.be.equal(0);
          expect(await collectionContract2.balanceOf(this.seller.address)).to.be.equal(0);
          expect(await collectionContract2.balanceOf(this.marketPlace.address)).to.be.equal(2);

          expect(await collectionContract2.ownerOf(totalSupply)).to.be.equal(this.marketPlace.address);

          token = await collectionContract2
            .connect(this.buyer)
            .safeMint("testURI3");

          result = await token.wait();
          totalSupply = await collectionContract2.totalSupply();

          expect(totalSupply).to.equal(3);
          expect(result.to).to.be.equal(collectionContract2.address);
          expect(result.from).to.be.equal(this.buyer.address);

          // SUCCESS
          event = result.events[0].args;
          expect(event.tokenId.toNumber(), totalSupply, "id is correct");
          expect(event.from, "0x0000000000000000000000000000000000000000", "from is correct");
          expect(event.to, this.buyer.address, "to is correct");

          // check token balance
          expect(await collectionContract2.balanceOf(this.owner.address)).to.be.equal(0);
          expect(await collectionContract2.balanceOf(this.seller.address)).to.be.equal(0);
          expect(await collectionContract2.balanceOf(this.buyer.address)).to.be.equal(1);
          expect(await collectionContract2.balanceOf(this.marketPlace.address)).to.be.equal(2);

          expect(await collectionContract2.ownerOf(totalSupply)).to.be.equal(this.buyer.address);

          // 6. Add token to collection
          await collectionContract2.connect(this.buyer)
            .setApprovalForAll(this.marketPlace.address, true);

          price = ethers.utils.parseUnits("3", "ether");

          createTx = await this.marketPlace
            .connect(this.buyer)
            .createCollectible(event.tokenId, createdCollection2.id, price, false, { from: this.buyer.address });

          result = await createTx.wait();

          expect(result.to).to.be.equal(this.marketPlace.address);
          expect(result.from).to.be.equal(this.buyer.address);

          args = result.events[1].args;
          expect(args.tokenId).to.be.equal(event.tokenId);
          expect(args.collectionId).to.be.equal(createdCollection2.id);
          expect(args.owner).to.be.equal(this.buyer.address);
          expect(args.creator).to.be.equal(this.buyer.address);
          expect(args.fulfilled).to.be.equal( false);
          expect(args.cancelled).to.be.equal( false);
          expect(args.price).to.be.equal(price);

          // after add token to market balance must change (token is going to market)
          expect(await collectionContract2.balanceOf(this.owner.address)).to.be.equal(0);
          expect(await collectionContract2.balanceOf(this.seller.address)).to.be.equal(0);
          expect(await collectionContract2.balanceOf(this.buyer.address)).to.be.equal(0);
          expect(await collectionContract2.balanceOf(this.marketPlace.address)).to.be.equal(3);

          expect(await collectionContract2.ownerOf(1)).to.be.equal(this.marketPlace.address);
          expect(await collectionContract2.ownerOf(2)).to.be.equal(this.marketPlace.address);
          expect(await collectionContract2.ownerOf(3)).to.be.equal(this.marketPlace.address);

          tokenURI = await collectionContract2.tokenURI(1);
          expect(tokenURI).to.be.equal('testURI');

          tokenURI = await collectionContract2.tokenURI(2);
          expect(tokenURI).to.be.equal('testURI2');

          tokenURI = await collectionContract2.tokenURI(3);
          expect(tokenURI).to.be.equal('testURI3');

          expect(await this.marketPlace.getUserFunds(this.owner.address)).to.equal(0);
          expect(await this.marketPlace.getUserFunds(this.buyer.address)).to.equal(0);
          expect(await this.marketPlace.getUserFunds(this.seller.address)).to.equal(0);

          // now we have 2 different collections with 3 tokens inside each
          const firstCollection = await this.marketPlace.getCollection(1);
          const firstCollectionByName = await this.marketPlace.getCollectionByName("Art");
          expect(firstCollection.id).to.be.equal(firstCollectionByName.id);

          token = await this.marketPlace.getCollectible(firstCollection.id, 1);

          expect(token.id).to.be.equal(1);
          expect(token.collectionId).to.be.equal(firstCollection.id);
          expect(token.tokenId).to.be.equal(1);
          expect(token.price).to.be.equal(ethers.utils.parseUnits("1.55", "ether"));
          // check token owner before buy
          expect(token.owner).to.be.equal(this.owner.address);
          expect(token.creator).to.be.equal(this.owner.address);
          expect(token.fulfilled).to.be.equal(false);
          expect(token.cancelled).to.be.equal(false);


          // check token owner before buy
          let fee = Number(ethers.utils.formatEther(firstCollection.fee));

          let tokenPrice = Number(ethers.utils.formatEther(token.price))

          let totalInEth = tokenPrice * fee / 100 + tokenPrice;

          let totalPrice1 = ethers.utils.parseEther(totalInEth.toString());

          //console.log(totalPrice1);

          // try to buy first token from first collection by buyer
          let buyTx = await this.marketPlace
            .connect(this.buyer)
            .buyCollectible(token.collectionId, token.id, { from: this.buyer.address, value: totalPrice1 });

          result = await buyTx.wait();
          args = result.events[1].args;

          expect(args.id).to.be.equal(1);
          expect(args.collectionId).to.be.equal(firstCollection.id);
          expect(args.tokenId).to.be.equal(1);
          expect(args.price).to.be.equal(ethers.utils.parseUnits("1.55", "ether"));
          // check token owner after buy
          expect(args.buyer).to.be.equal(this.buyer.address);
          expect(args.owner).to.be.equal(this.buyer.address);
          expect(args.creator).to.be.equal(this.owner.address);
          expect(args.fulfilled).to.be.equal(false);
          expect(args.cancelled).to.be.equal(false);

          // check balances and owner after purchase
          expect(await collectionContract1.balanceOf(this.owner.address)).to.be.equal(0);
          expect(await collectionContract1.balanceOf(this.seller.address)).to.be.equal(0);
          expect(await collectionContract1.balanceOf(this.buyer.address)).to.be.equal(1);
          expect(await collectionContract1.balanceOf(this.marketPlace.address)).to.be.equal(2);

          expect(await collectionContract1.ownerOf(1)).to.be.equal(this.buyer.address);

          expect(await this.marketPlace.getUserFunds(this.owner.address)).to.equal(0);
          expect(await this.marketPlace.getUserFunds(this.buyer.address)).to.equal(totalPrice1); // fund increase
          expect(await this.marketPlace.getUserFunds(this.seller.address)).to.equal(0);

          // second token
          token = await this.marketPlace.getCollectible(firstCollection.id, 2);
          expect(token.id).to.be.equal(2);
          expect(token.collectionId).to.be.equal(firstCollection.id);
          expect(token.tokenId).to.be.equal(2);
          expect(token.price).to.be.equal(ethers.utils.parseUnits("2", "ether"));
          expect(token.owner).to.be.equal(this.owner.address);
          expect(token.creator).to.be.equal(this.owner.address);
          expect(token.fulfilled).to.be.equal(false);
          expect(token.cancelled).to.be.equal(false);


          // check token owner before buy
          fee = Number(ethers.utils.formatEther(firstCollection.fee));

          tokenPrice = Number(ethers.utils.formatEther(token.price))

          totalInEth = tokenPrice * fee / 100 + tokenPrice;

          let totalPrice2 = ethers.utils.parseEther(totalInEth.toString());

          // try to buy first token from first collection by buyer
          buyTx = await this.marketPlace
            .connect(this.buyer)
            .buyCollectible(token.collectionId, token.id, { from: this.buyer.address, value: totalPrice2 });

          result = await buyTx.wait();
          args = result.events[1].args;

          expect(args.id).to.be.equal(2);
          expect(args.collectionId).to.be.equal(firstCollection.id);
          expect(args.tokenId).to.be.equal(2);
          expect(args.price).to.be.equal(ethers.utils.parseUnits("2", "ether"));
          // check token owner after buy
          expect(args.buyer).to.be.equal(this.buyer.address);
          expect(args.owner).to.be.equal(this.buyer.address);
          expect(args.creator).to.be.equal(this.owner.address);
          expect(args.fulfilled).to.be.equal(false);
          expect(args.cancelled).to.be.equal(false);

          // check balances and owner after purchase
          expect(await collectionContract1.balanceOf(this.owner.address)).to.be.equal(0);
          expect(await collectionContract1.balanceOf(this.seller.address)).to.be.equal(0);
          expect(await collectionContract1.balanceOf(this.buyer.address)).to.be.equal(2);
          expect(await collectionContract1.balanceOf(this.marketPlace.address)).to.be.equal(1);

          expect(await collectionContract1.ownerOf(2)).to.be.equal(this.buyer.address);

          expect(await this.marketPlace.getUserFunds(this.owner.address)).to.equal(0);
          expect(await this.marketPlace.getUserFunds(this.buyer.address)).to.equal(totalPrice1.add(totalPrice2)); // add funds for second token
          expect(await this.marketPlace.getUserFunds(this.seller.address)).to.equal(0);

          token = await this.marketPlace.getCollectible(firstCollection.id, 3);

          expect(token.id).to.be.equal(3);
          expect(token.collectionId).to.be.equal(firstCollection.id);
          expect(token.tokenId).to.be.equal(3);
          expect(token.price).to.be.equal(ethers.utils.parseUnits("2", "ether"));
          expect(token.owner).to.be.equal(this.owner.address);
          expect(token.creator).to.be.equal(this.owner.address);
          expect(token.fulfilled).to.be.equal(false);
          expect(token.cancelled).to.be.equal(false);

          fee = Number(ethers.utils.formatEther(firstCollection.fee));

          tokenPrice = Number(ethers.utils.formatEther(token.price))

          totalInEth = tokenPrice * fee / 100 + tokenPrice;

          let totalPrice3 = ethers.utils.parseEther(totalInEth.toString());

          // try to buy token from first collection by buyer
          buyTx = await this.marketPlace
            .connect(this.buyer)
            .buyCollectible(token.collectionId, token.id, { from: this.buyer.address, value: totalPrice3 });

          result = await buyTx.wait();
          args = result.events[1].args;

          expect(args.id).to.be.equal(3);
          expect(args.collectionId).to.be.equal(firstCollection.id);
          expect(args.tokenId).to.be.equal(3);
          expect(args.price).to.be.equal(ethers.utils.parseUnits("2", "ether"));
          // check token owner after buy
          expect(args.buyer).to.be.equal(this.buyer.address);
          expect(args.owner).to.be.equal(this.buyer.address);
          expect(args.creator).to.be.equal(this.owner.address);
          expect(args.fulfilled).to.be.equal(false);
          expect(args.cancelled).to.be.equal(false);

          // check balances and owner after purchase
          expect(await collectionContract1.balanceOf(this.owner.address)).to.be.equal(0);
          expect(await collectionContract1.balanceOf(this.seller.address)).to.be.equal(0);
          expect(await collectionContract1.balanceOf(this.buyer.address)).to.be.equal(3);
          expect(await collectionContract1.balanceOf(this.marketPlace.address)).to.be.equal(0);

          expect(await collectionContract1.ownerOf(3)).to.be.equal(this.buyer.address);

          expect(await this.marketPlace.getUserFunds(this.owner.address)).to.equal(0);
          expect(await this.marketPlace.getUserFunds(this.buyer.address)).to.equal(totalPrice1.add(totalPrice2).add(totalPrice3)); // add funds for third token
          expect(await this.marketPlace.getUserFunds(this.seller.address)).to.equal(0);

          // ###############################################################################

          const secondCollection = await this.marketPlace.getCollection(2);
          const secondCollectionByName = await this.marketPlace.getCollectionByName("Digital");
          expect(secondCollection.id).to.be.equal(secondCollectionByName.id);

          token = await this.marketPlace.getCollectible(secondCollection.id, 1);
          expect(token.id).to.be.equal(1);
          expect(token.collectionId).to.be.equal(secondCollection.id);
          expect(token.tokenId).to.be.equal(1);
          expect(token.price).to.be.equal(ethers.utils.parseUnits("1.56", "ether"));
          expect(token.owner).to.be.equal(this.seller.address);
          expect(token.creator).to.be.equal(this.seller.address);
          expect(token.fulfilled).to.be.equal(false);
          expect(token.cancelled).to.be.equal(false);

          fee = Number(ethers.utils.formatEther(secondCollection.fee));

          tokenPrice = Number(ethers.utils.formatEther(token.price))

          totalInEth = tokenPrice * fee / 100 + tokenPrice;

          let totalPrice4 = ethers.utils.parseEther(totalInEth.toString());

          // try to buy first token from first collection by buyer
          buyTx = await this.marketPlace
            .connect(this.buyer)
            .buyCollectible(token.collectionId, token.id, { from: this.buyer.address, value: totalPrice4 });

          result = await buyTx.wait();
          args = result.events[1].args;

          expect(args.id).to.be.equal(1);
          expect(args.collectionId).to.be.equal(secondCollection.id);
          expect(args.tokenId).to.be.equal(1);
          expect(args.price).to.be.equal(ethers.utils.parseUnits("1.56", "ether"));
          // check token owner after buy
          expect(args.buyer).to.be.equal(this.buyer.address);
          expect(args.owner).to.be.equal(this.buyer.address);
          expect(args.creator).to.be.equal(this.seller.address); // keep creator
          expect(args.fulfilled).to.be.equal(false);
          expect(args.cancelled).to.be.equal(false);

          // check balances and owner after purchase
          expect(await collectionContract2.balanceOf(this.owner.address)).to.be.equal(0);
          expect(await collectionContract2.balanceOf(this.seller.address)).to.be.equal(0);
          expect(await collectionContract2.balanceOf(this.buyer.address)).to.be.equal(1);
          expect(await collectionContract2.balanceOf(this.marketPlace.address)).to.be.equal(2); // market has 2 tokens

          expect(await collectionContract2.ownerOf(1)).to.be.equal(this.buyer.address);

          expect(await this.marketPlace.getUserFunds(this.owner.address)).to.equal(0);
          expect(await this.marketPlace.getUserFunds(this.buyer.address))
            .to.equal(totalPrice1.add(totalPrice2).add(totalPrice3).add(totalPrice4)); // add funds for third token
          expect(await this.marketPlace.getUserFunds(this.seller.address)).to.equal(0);

          token = await this.marketPlace.getCollectible(secondCollection.id, 2);

          expect(token.id).to.be.equal(2);
          expect(token.collectionId).to.be.equal(secondCollection.id);
          expect(token.tokenId).to.be.equal(2);
          expect(token.price).to.be.equal(ethers.utils.parseUnits("2", "ether"));
          expect(token.owner).to.be.equal(this.seller.address);
          expect(token.creator).to.be.equal(this.seller.address);
          expect(token.fulfilled).to.be.equal(false);
          expect(token.cancelled).to.be.equal(false);

          fee = Number(ethers.utils.formatEther(secondCollection.fee));

          tokenPrice = Number(ethers.utils.formatEther(token.price))

          totalInEth = tokenPrice * fee / 100 + tokenPrice;

          let totalPrice5 = ethers.utils.parseEther(totalInEth.toString());

          // try to buy first token from first collection by buyer
          buyTx = await this.marketPlace
            .connect(this.buyer)
            .buyCollectible(token.collectionId, token.id, { from: this.buyer.address, value: totalPrice5 });

          result = await buyTx.wait();
          args = result.events[1].args;

          expect(args.id).to.be.equal(2);
          expect(args.collectionId).to.be.equal(secondCollection.id);
          expect(args.tokenId).to.be.equal(2);
          expect(args.price).to.be.equal(ethers.utils.parseUnits("2", "ether"));
          // check token owner after buy
          expect(args.buyer).to.be.equal(this.buyer.address);
          expect(args.owner).to.be.equal(this.buyer.address);
          expect(args.creator).to.be.equal(this.seller.address); // keep creator
          expect(args.fulfilled).to.be.equal(false);
          expect(args.cancelled).to.be.equal(false);

          // check balances and owner after purchase
          expect(await collectionContract2.balanceOf(this.owner.address)).to.be.equal(0);
          expect(await collectionContract2.balanceOf(this.seller.address)).to.be.equal(0);
          expect(await collectionContract2.balanceOf(this.buyer.address)).to.be.equal(2);
          expect(await collectionContract2.balanceOf(this.marketPlace.address)).to.be.equal(1); // market has 1 token to sell

          expect(await collectionContract2.ownerOf(2)).to.be.equal(this.buyer.address);

          expect(await this.marketPlace.getUserFunds(this.owner.address)).to.equal(0);
          expect(await this.marketPlace.getUserFunds(this.buyer.address))
            .to.equal(totalPrice1.add(totalPrice2).add(totalPrice3).add(totalPrice4).add(totalPrice5)); // add funds for third token
          expect(await this.marketPlace.getUserFunds(this.seller.address)).to.equal(0);


          token = await this.marketPlace.getCollectible(secondCollection.id, 3);
          expect(token.id).to.be.equal(3);
          expect(token.collectionId).to.be.equal(secondCollection.id);
          expect(token.tokenId).to.be.equal(3);
          expect(token.price).to.be.equal(ethers.utils.parseUnits("3", "ether"));
          expect(token.owner).to.be.equal(this.buyer.address);
          expect(token.creator).to.be.equal(this.buyer.address);
          expect(token.fulfilled).to.be.equal(false);
          expect(token.cancelled).to.be.equal(false);

          fee = Number(ethers.utils.formatEther(secondCollection.fee));

          tokenPrice = Number(ethers.utils.formatEther(token.price))

          totalInEth = tokenPrice * fee / 100 + tokenPrice;

          let totalPrice6 = ethers.utils.parseEther(totalInEth.toString());

          // try to buy first token from first collection by buyer
          buyTx = await this.marketPlace
            .connect(this.buyer)
            .buyCollectible(token.collectionId, token.id, { from: this.buyer.address, value: totalPrice6 });

          result = await buyTx.wait();
          args = result.events[1].args;

          expect(args.id).to.be.equal(3);
          expect(args.collectionId).to.be.equal(secondCollection.id);
          expect(args.tokenId).to.be.equal(3);
          expect(args.price).to.be.equal(ethers.utils.parseUnits("3", "ether"));
          // check token owner after buy
          expect(args.buyer).to.be.equal(this.buyer.address);
          expect(args.owner).to.be.equal(this.buyer.address);
          expect(args.creator).to.be.equal(this.buyer.address); // keep creator
          expect(args.fulfilled).to.be.equal(false);
          expect(args.cancelled).to.be.equal(false);

          // check balances and owner after purchase
          expect(await collectionContract2.balanceOf(this.owner.address)).to.be.equal(0);
          expect(await collectionContract2.balanceOf(this.seller.address)).to.be.equal(0);
          expect(await collectionContract2.balanceOf(this.buyer.address)).to.be.equal(3);
          expect(await collectionContract2.balanceOf(this.marketPlace.address)).to.be.equal(0); // market sold all tokens

          expect(await collectionContract2.ownerOf(3)).to.be.equal(this.buyer.address);

          expect(await this.marketPlace.getUserFunds(this.owner.address)).to.equal(0);
          expect(await this.marketPlace.getUserFunds(this.buyer.address))
            .to.equal(totalPrice1.add(totalPrice2).add(totalPrice3).add(totalPrice4).add(totalPrice5).add(totalPrice6)); // add funds for third token
          expect(await this.marketPlace.getUserFunds(this.seller.address)).to.equal(0);


          // #####################################
          // check issued token count
          totalSupply = await collectionContract1.totalSupply();
          expect(totalSupply).to.equal(3);

          // 5. Create new token
          token = await collectionContract1
            .connect(this.seller)
            .safeMint("testTokenToBeCancelled");

          result = await token.wait();
          totalSupply = await collectionContract1.totalSupply();

          expect(totalSupply).to.equal(4);
          expect(result.to).to.be.equal(collectionContract1.address);
          expect(result.from).to.be.equal(this.seller.address);

          // SUCCESS
          event = result.events[0].args;
          expect(event.tokenId.toNumber(), totalSupply, "id is correct");
          expect(event.from, "0x0000000000000000000000000000000000000000", "from is correct");
          expect(event.to, this.seller.address, "to is correct");

          // check token balance
          expect(await collectionContract1.balanceOf(this.owner.address)).to.be.equal(0);
          expect(await collectionContract1.balanceOf(this.buyer.address)).to.be.equal(3);
          expect(await collectionContract1.balanceOf(this.seller.address)).to.be.equal(1);
          expect(await collectionContract1.balanceOf(this.marketPlace.address)).to.be.equal(0);

          expect(await collectionContract1.ownerOf(totalSupply)).to.be.equal(this.seller.address);

          // Add token to collection
          price = ethers.utils.parseUnits("10", "ether");

          await collectionContract1.connect(this.seller)
            .setApprovalForAll(this.marketPlace.address, true);

          createTx = await this.marketPlace
              .connect(this.seller)
              .createCollectible(event.tokenId, createdCollection1.id, price, false, { from: this.seller.address });

          result = await createTx.wait();

          expect(result.to).to.be.equal(this.marketPlace.address);
          expect(result.from).to.be.equal(this.seller.address);

          args = result.events[1].args;
          expect(args.tokenId).to.be.equal(event.tokenId);
          expect(args.collectionId).to.be.equal(createdCollection1.id);
          expect(args.owner).to.be.equal(this.seller.address);
          expect(args.creator).to.be.equal(this.seller.address);
          expect(args.fulfilled).to.be.equal( false);
          expect(args.cancelled).to.be.equal( false);
          expect(args.price).to.be.equal(price);

          // after add token to market balance must change (token is going to market)
          expect(await collectionContract1.balanceOf(this.owner.address)).to.be.equal(0);
          expect(await collectionContract1.balanceOf(this.marketPlace.address)).to.be.equal(1);
          expect(await collectionContract1.balanceOf(this.seller.address)).to.be.equal(0);

          expect(await collectionContract1.ownerOf(totalSupply)).to.be.equal(this.marketPlace.address);

          expect(await this.marketPlace.getUserFunds(this.owner.address)).to.equal(0);
          expect(await this.marketPlace.getUserFunds(this.buyer.address))
            .to.equal(totalPrice1.add(totalPrice2).add(totalPrice3).add(totalPrice4).add(totalPrice5).add(totalPrice6)); // add funds for third token

          expect(await this.marketPlace.getUserFunds(this.seller.address)).to.equal(0);

          // cancel token listing

          const tokenId = 4;
          const cancelTx = await this.marketPlace
            .connect(this.seller).cancelCollectible(createdCollection1.id, tokenId, { from: this.seller.address });
          result = await cancelTx.wait();
          args = result.events[1].args;

          expect(args.id).to.be.equal(tokenId);
          expect(args.collectionId).to.be.equal(createdCollection1.id);
          expect(args.owner).to.be.equal(this.seller.address);

          const cancelledToken = await this.marketPlace.getCollectible(createdCollection1.id, tokenId);

          expect(cancelledToken.cancelled).to.equal(true);

          expect(await collectionContract1.balanceOf(this.owner.address)).to.be.equal(0);
          expect(await collectionContract1.balanceOf(this.marketPlace.address)).to.be.equal(0);
          expect(await collectionContract1.balanceOf(this.seller.address)).to.be.equal(1); // token returned to seller

          expect(await collectionContract1.ownerOf(totalSupply)).to.be.equal(this.seller.address);

          expect(await this.marketPlace.getUserFunds(this.owner.address)).to.equal(0);
          expect(await this.marketPlace.getUserFunds(this.buyer.address))
            .to.equal(totalPrice1.add(totalPrice2).add(totalPrice3).add(totalPrice4).add(totalPrice5).add(totalPrice6)); // add funds for third token

          expect(await this.marketPlace.getUserFunds(this.seller.address)).to.equal(0);

          // revert cancel
          const revertTx = await this.marketPlace
            .connect(this.seller).revertCancelCollectible(createdCollection1.id, tokenId, { from: this.seller.address });
          result = await revertTx.wait();
          args = result.events[1].args;

          expect(args.id).to.be.equal(tokenId);
          expect(args.collectionId).to.be.equal(createdCollection1.id);
          expect(args.owner).to.be.equal(this.seller.address);

          const revertedToken = await this.marketPlace.getCollectible(createdCollection1.id, tokenId);

          expect(revertedToken.cancelled).to.equal(false);

          expect(await collectionContract1.balanceOf(this.owner.address)).to.be.equal(0);
          expect(await collectionContract1.balanceOf(this.marketPlace.address)).to.be.equal(1); // token returned to market
          expect(await collectionContract1.balanceOf(this.seller.address)).to.be.equal(0);

          expect(await collectionContract1.ownerOf(totalSupply)).to.be.equal(this.marketPlace.address);

          expect(await this.marketPlace.getUserFunds(this.owner.address)).to.equal(0);
          expect(await this.marketPlace.getUserFunds(this.buyer.address))
            .to.equal(totalPrice1.add(totalPrice2).add(totalPrice3).add(totalPrice4).add(totalPrice5).add(totalPrice6)); // add funds for third token

          expect(await this.marketPlace.getUserFunds(this.seller.address)).to.equal(0);

          // buy reverted token
          // try to buy first token from first collection by buyer
          fee = Number(ethers.utils.formatEther(createdCollection1.fee));

          tokenPrice = Number(ethers.utils.formatEther(price))

          totalInEth = tokenPrice * fee / 100 + tokenPrice;

          let totalPrice = ethers.utils.parseEther(totalInEth.toString());
          buyTx = await this.marketPlace
            .connect(this.buyer)
            .buyCollectible(createdCollection1.id, tokenId, { from: this.buyer.address, value: totalPrice });

          result = await buyTx.wait();
          args = result.events[1].args;

          expect(args.id).to.be.equal(4);
          expect(args.collectionId).to.be.equal(createdCollection1.id);
          expect(args.tokenId).to.be.equal(4);
          expect(args.price).to.be.equal(ethers.utils.parseUnits("10", "ether"));
          // check token owner after buy
          expect(args.buyer).to.be.equal(this.buyer.address);
          expect(args.owner).to.be.equal(this.buyer.address);
          expect(args.creator).to.be.equal(this.seller.address);
          expect(args.fulfilled).to.be.equal(false);
          expect(args.cancelled).to.be.equal(false);

          // check balances and owner after purchase
          expect(await collectionContract1.balanceOf(this.owner.address)).to.be.equal(0);
          expect(await collectionContract1.balanceOf(this.seller.address)).to.be.equal(0);
          expect(await collectionContract1.balanceOf(this.buyer.address)).to.be.equal(4);
          expect(await collectionContract1.balanceOf(this.marketPlace.address)).to.be.equal(0);

          expect(await collectionContract1.ownerOf(4)).to.be.equal(this.buyer.address);

          await collectionContract1.connect(this.buyer)
            .setApprovalForAll(this.marketPlace.address, true);

          const sellTx = await this.marketPlace.connect(this.buyer).sellCollectible(createdCollection1.id, 3, price.mul(21));
          result = await sellTx.wait();
          expect((await this.marketPlace.getCollectible(createdCollection1.id, 3)).owner).to.equal(this.buyer.address);

          expect(await collectionContract1.balanceOf(this.marketPlace.address)).to.be.equal(1); // done.

          // keep collectible owner by buyer, but ownerOf is marketPlace as it was done for just created
          expect(await collectionContract1.ownerOf(3)).to.be.equal(this.marketPlace.address);

          expect(await this.marketPlace.getUserFunds(this.owner.address)).to.equal(0);
          // fee = Number(ethers.utils.formatEther(createdCollection1.fee));
          //
          // tokenPrice = Number(ethers.utils.formatEther(price))
          //
          // totalInEth = tokenPrice * fee / 100 + tokenPrice;
          //
          // let totalPriceX = ethers.utils.parseEther(totalInEth.toString());
          // expect(await this.marketPlace.getUserFunds(this.buyer.address))
          //   .to.equal(totalPrice1
          //   .add(totalPrice2)
          //   .add(totalPrice3)
          //   .add(totalPrice4)
          //   .add(totalPrice5)
          //   .add(totalPrice6)
          //   .add(totalPriceX)
          // ); // add funds for second token
          // expect(await this.marketPlace.getUserFunds(this.seller.address)).to.equal(0);


          // claim funds
          const funds = await this.marketPlace
            .connect(this.buyer).getUserFunds(this.buyer.address);

          const claimTx = await this.marketPlace
            .connect(this.buyer).claimFunds({ from: this.buyer.address, value: funds });
          result = await claimTx.wait();
          expect(await this.marketPlace.connect(this.buyer).getUserFunds(this.buyer.address)).to.equal(0); *!/
      } catch (e) {
        console.error(e);
      }
    });*/

  });
});

