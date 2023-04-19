import {ethers} from "hardhat";
import {Marketplace} from "../typechain-types";
import moment from "moment";
import {BigNumber} from "ethers";
// Import utilities from Test Helpers
const { BN, expectEvent, expectRevert } = require('@openzeppelin/test-helpers');

require("chai").use(require("chai-as-promised")).should();
const { expect } = require("chai");
// We use `loadFixture` to share common setups (or fixtures) between tests.
// Using this simplifies your tests and makes them run faster, by taking
// advantage of Hardhat Network's snapshot functionality.
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

describe("Auction", function() {
  async function deployAuctionFixture() {
    try {
      // const [owner, seller, buyer] = await ethers.getSigners();
      //
      // const MarketPlaceFactory = await ethers.getContractFactory("Marketplace", owner);
      // const NFTCollectionFactory = await ethers.getContractFactory("NFTCollection", owner);
      // const NFTAuctionFactory = await ethers.getContractFactory("NFTAuction", owner);
      //
      // const marketName = "Ploutonion";
      // const marketFee = 1;
      //
      // const marketPlace = await MarketPlaceFactory.deploy(marketName, marketFee);
      // await marketPlace.deployed();
      //
      // let collectionName = "Monsters";
      // let collectionSymbol = "MST";
      // let collectionDescription = "Modern Cuties";
      // let collectionFee = ethers.utils.parseEther("1.25");
      // let collectionPrice = 1000;
      //
      // // // 2. Deploy contract
      // const collection = await NFTCollectionFactory
      //   .deploy(collectionName, collectionSymbol);
      //
      // await collection.deployed();
      //
      // // 4. Mint Collection
      // const createCollectionTx = await marketPlace
      //   .connect(owner)
      //   .createCollection(
      //     collectionName,
      //     collectionSymbol,
      //     collectionDescription,
      //     collectionFee,
      //     collectionPrice,
      //     collection.address,
      //     owner.address
      //   );
      //
      // await createCollectionTx.wait();
      //
      // // 5. Mint token
      // const token = await collection
      //   .connect(owner)
      //   .safeMint("testURI");
      //
      // let result = await token.wait();
      //
      // // SUCCESS
      // // @ts-ignore
      // let event = result.events[0].args;
      //
      // // 6. Add token to collection
      // let collectionsCount = await marketPlace.getCollectionsCount();
      // let createdCollection = await marketPlace.getCollection(collectionsCount);
      //
      // const startTime = moment().unix();
      // const endTime = moment().add(3, 'days').unix();
      //
      // const startPrice = ethers.utils.parseEther("1.2");
      // const reservePrice = ethers.utils.parseEther("1.5");
      //
      // const auction = await NFTAuctionFactory.deploy(
      //   collection.address,
      //   createdCollection.id,
      //   event?.tokenId,
      //   startPrice,
      //   reservePrice,
      //   startTime,
      //   endTime
      // );
      // await auction.deployed();
      //
      //
      // await collection.connect(owner)
      //   .setApprovalForAll(marketPlace.address, true);
      //
      // // @ts-ignore
      // let createTx = await marketPlace
      //   .connect(owner)
      //   // @ts-ignore
      //   .createCollectible(event?.tokenId, createdCollection.id, 0, true, { from: owner.address });
      //
      // await createTx.wait();
      //
      // let collectibleInCollectionCount = await marketPlace.getCollectibleCount(createdCollection.id);
      //
      // let createdCollectible = await marketPlace.getCollectible(createdCollection.id, collectibleInCollectionCount);
      //
      // return {
      //   marketPlace,
      //   collection,
      //   auction,
      //   owner,
      //   seller,
      //   buyer,
      //   token,
      //   startTime,
      //   endTime,
      //   createdCollection,
      //   createdCollectible
      // };
    } catch (e) {
      console.error(e);
    }
  }

  before(async function () {
    try {
      // const {
      //   marketPlace,
      //   collection,
      //   auction,
      //   owner,
      //   seller,
      //   buyer,
      //   token,
      //   startTime,
      //   endTime,
      //   createdCollection,
      //   createdCollectible
      // } = await loadFixture(deployAuctionFixture);
      //   this.marketPlace = marketPlace;
      //   this.collection = collection;
      //   this.owner = owner;
      //   this.seller = seller;
      //   this.buyer = buyer;
      //   this.auction = auction;
      //   this.token = token;
      //   this.startTime = startTime;
      //   this.endTime = endTime;
      //   this.createdCollection = createdCollection;
      //   this.createdCollectible = createdCollectible;
    } catch (e) {
      console.error(e);
    }
  });

  // nest describe calls to create subsections.
  describe("Deployment", function () {
    it("1. Should set the address", async function() {
      try {
        // const address = this.auction.address;
        // expect(address).not.to.equal("");
        // expect(address).not.to.equal(0x0);
        // expect(address).not.to.equal(null);
        // expect(address).not.to.equal(undefined);
      } catch (e) {
        console.error(e);
      }
    });

    it("2. check auction", async function() {
      try {
        // expect((await this.auction.auctionStartTime()).toString()).to.equal(this.startTime.toString());
        // expect((await this.auction.auctionEndTime()).toString()).to.equal(this.endTime.toString());
        // expect((await this.auction.tokenId()).toNumber()).to.equal(this.createdCollectible.id.toNumber());
        // expect((await this.auction.collectionId()).toNumber()).to.equal(this.createdCollection.id.toNumber());
        // expect(await this.auction.beneficiary()).to.equal(this.owner.address);
        // expect((await this.auction.startPrice()).toString()).to.equal(ethers.utils.parseEther("1.5"));
        // expect((await this.auction.reservePrice()).toString()).to.equal(ethers.utils.parseEther("1.2"));
        // expect((await this.auction.highestBid()).toNumber()).to.equal(0);
        // expect(await this.auction.highestBidder()).to.equal("0x0000000000000000000000000000000000000000");
        // expect(await this.auction.isStarted()).to.equal(false);
        // expect(await this.auction.isEnded()).to.equal(false);
      } catch (e) {
        console.error(e);
      }
    });
    it("3. check auction functionality", async function() {
      try {
        // expect(await this.auction.isStarted()).to.equal(false);
        // expect(await this.auction.isEnded()).to.equal(false);
        //
        // // check token balance
        // let totalSupply = await this.collection.totalSupply();
        // expect(totalSupply).to.equal(1);
        //
        // // After creating collectible token belongs to marketplace
        // expect(await this.collection.balanceOf(this.owner.address)).to.be.equal(0);
        // expect(await this.collection.balanceOf(this.buyer.address)).to.be.equal(0);
        // expect(await this.collection.balanceOf(this.seller.address)).to.be.equal(0);
        // expect(await this.collection.balanceOf(this.marketPlace.address)).to.be.equal(1);
        // expect(await this.collection.balanceOf(this.auction.address)).to.be.equal(0);
        // expect(await this.collection.ownerOf(totalSupply)).to.be.equal(this.marketPlace.address);
        //
        // const approveTx = await this.collection.connect(this.owner)
        //   .setApprovalForAll(this.auction.address, true);
        // await approveTx.wait();
        //
        // let tx = await this.auction.connect(this.owner).startAuction();
        //
        // await tx.wait();
        //
        // expect(await this.auction.isStarted()).to.equal(true);
        // expect(await this.auction.isEnded()).to.equal(false);
        //
        // let ownerBalance  = await ethers.provider.getBalance(this.owner.address);
        // let sellerBalance = await ethers.provider.getBalance(this.seller.address);
        // let buyerBalance  = await ethers.provider.getBalance(this.buyer.address);
        //
        // expect((await this.auction.highestBid())).to.equal(0);
        // expect((await this.auction.startPrice()).toString()).to.equal((ethers.utils.parseEther("1.5").toString()));
        //
        // expect(await this.collection.balanceOf(this.owner.address)).to.be.equal(0);
        // expect(await this.collection.balanceOf(this.buyer.address)).to.be.equal(0);
        // expect(await this.collection.balanceOf(this.seller.address)).to.be.equal(0);
        // expect(await this.collection.balanceOf(this.marketPlace.address)).to.be.equal(1);
        // expect(await this.collection.balanceOf(this.auction.address)).to.be.equal(0);
        // expect(await this.collection.ownerOf(totalSupply)).to.be.equal(this.marketPlace.address);
        //
        // let weiBid = ethers.utils.parseEther("100");
        //
        // tx = await this.auction.connect(this.seller).placeBid({ from: this.seller.address, value: weiBid });
        //
        // const res = await tx.wait();
        //
        // expect((await this.auction.highestBidder()).toString().toLowerCase()).to.equal(this.seller.address.toString().toLowerCase());
        // expect((await this.auction.highestBid())).to.equal(weiBid);
        //
        // const newOwnerBalance = await ethers.provider.getBalance(this.owner.address);
        // const newSellerBalance = await ethers.provider.getBalance(this.seller.address);
        // const newBuyerBalance = await ethers.provider.getBalance(this.buyer.address);
        //
        // console.log("owner",  ethers.utils.formatEther(ownerBalance),  ethers.utils.formatEther(newOwnerBalance) );
        // console.log("seller", ethers.utils.formatEther(sellerBalance), ethers.utils.formatEther(newSellerBalance), ethers.utils.formatEther(sellerBalance.sub(newSellerBalance)));
        // console.log("buyer",  ethers.utils.formatEther(buyerBalance),  ethers.utils.formatEther(newBuyerBalance));
        //
        // weiBid = ethers.utils.parseEther("200");
        //
        // tx = await this.auction.connect(this.buyer).placeBid({ from: this.buyer.address, value: weiBid });
        //
        // await tx.wait();
        //
        // const updatedOwnerBalance = await ethers.provider.getBalance(this.owner.address);
        // const updatedSellerBalance = await ethers.provider.getBalance(this.seller.address);
        // const updatedBuyerBalance = await ethers.provider.getBalance(this.buyer.address);
        //
        // console.log("owner",  ethers.utils.formatEther(ownerBalance),  ethers.utils.formatEther(newOwnerBalance), ethers.utils.formatEther(updatedOwnerBalance) );
        // console.log("seller", ethers.utils.formatEther(sellerBalance), ethers.utils.formatEther(newSellerBalance), ethers.utils.formatEther(updatedSellerBalance));
        // console.log("buyer",  ethers.utils.formatEther(buyerBalance),  ethers.utils.formatEther(newBuyerBalance), ethers.utils.formatEther(updatedBuyerBalance));

        //
        // expect((await this.auction.highestBidder()).toString().toLowerCase()).to.equal(this.buyer.address.toString().toLowerCase());
        // expect((await this.auction.highestBid())).to.equal(weiBid);
        //
        //

        // console.log("owner", ownerBalance, await ethers.provider.getBalance(this.owner.address));
        // console.log(weiBid);
        // console.log("seller", sellerBalance.sub(await ethers.provider.getBalance(this.seller.address)));
        // console.log("buyer", buyerBalance);
        // expect(ownerBalance).to.equal(await ethers.provider.getBalance(this.owner.address));
        // expect(sellerBalance).to.equal((await ethers.provider.getBalance(this.seller.address)).add(weiBid).add(tx.gasPrice));
        //
        // buyerBalance = await ethers.provider.getBalance(this.buyer.address);
        // console.log(buyerBalance);
        //
        //
        // expect(await this.collection.balanceOf(this.owner.address)).to.be.equal(0);
        // expect(await this.collection.balanceOf(this.buyer.address)).to.be.equal(0);
        // expect(await this.collection.balanceOf(this.seller.address)).to.be.equal(0);
        // expect(await this.collection.balanceOf(this.marketPlace.address)).to.be.equal(1);
        // expect(await this.collection.balanceOf(this.auction.address)).to.be.equal(0);
        // expect(await this.collection.ownerOf(totalSupply)).to.be.equal(this.marketPlace.address);
        //
        //
        // weiPrice = ethers.utils.parseEther("1.7");
        //
        // expect(weiPrice).to.be.greaterThan(await this.auction.highestBid());
        //
        // tx = await this.auction.connect(this.buyer).placeBid({ from: this.buyer.address, value: weiPrice });
        // await tx.wait();
        // expect((await this.auction.highestBidder()).toString().toLowerCase()).to.equal(this.buyer.address.toString().toLowerCase());
        // expect((await this.auction.highestBid()).toString()).to.equal(weiPrice.toString());
        // expect((await this.auction.startPrice()).toString()).to.equal((ethers.utils.parseEther("1.5").toString()));
        //
        // expect(await this.collection.balanceOf(this.owner.address)).to.be.equal(0);
        // expect(await this.collection.balanceOf(this.buyer.address)).to.be.equal(0);
        // expect(await this.collection.balanceOf(this.seller.address)).to.be.equal(0);
        // expect(await this.collection.balanceOf(this.marketPlace.address)).to.be.equal(1);
        // expect(await this.collection.balanceOf(this.auction.address)).to.be.equal(0);
        // expect(await this.collection.ownerOf(totalSupply)).to.be.equal(this.marketPlace.address);

      } catch (e) {
        console.error(e);
      }
    });
  });
});

