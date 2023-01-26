import {artifacts, ethers } from "hardhat";
import {Marketplace, Marketplace__factory} from "../typechain-types";
import {beforeEach} from "mocha";
// Import utilities from Test Helpers
const { BN, expectEvent, expectRevert } = require('@openzeppelin/test-helpers');

require("chai").use(require("chai-as-promised")).should();
const { expect } = require("chai");
// We use `loadFixture` to share common setups (or fixtures) between tests.
// Using this simplifies your tests and makes them run faster, by taking
// advantage of Hardhat Network's snapshot functionality.
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

describe("Marketplace", function() {
  async function deployMarketPlaceFixture() {
    try {
      const [owner, seller, buyer] = await ethers.getSigners();

      // First test market contract

      const MarketPlaceContract = await ethers.getContractFactory("Marketplace", owner);

      // To deploy our contract, we just have to call Token.deploy() and await
      // its deployed() method, which happens once its transaction has been
      // mined.

      const marketName = "Ploutonion";
      const marketFee = 1;

      const marketPlace = await MarketPlaceContract.deploy(marketName, marketFee);

      await marketPlace.deployed();

      const CollectionContract = await ethers.getContractFactory("NFTCollection", owner);
      // Fixtures can return anything you consider useful for your tests
      return {
        MarketPlaceContract,
        CollectionContract,
        marketPlace,
        owner: owner,
        seller: seller,
        buyer: buyer
      };
    } catch (e) {
      console.error(e);
    }
  }

  before(async function () {
    try {
      const { marketPlace, owner, seller, buyer, CollectionContract } = await loadFixture(deployMarketPlaceFixture);
      this.owner = owner;
      this.seller = seller;
      this.buyer = buyer;
      this.marketPlace = marketPlace;
      this.CollectionContract = CollectionContract;
    } catch (e) {
      console.error(e);
    }
  });

  // nest describe calls to create subsections.
  describe("Deployment", function () {
    it("1. Should set the address", async function() {
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

    it("2. Should set the right owner", async function () {
      // This test expects the owner variable stored in the contract to be
      // equal to our Signer's owner.
      expect(await this.marketPlace.getOwner()).to.equal(this.owner.address);
    });

    it("3. Should has not empty name", async function() {
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

    it("4. Should has not empty fee", async function() {
      try {
        const fee = await this.marketPlace.getFee();
        expect(fee).not.to.equal(0);
        expect(fee).to.equal(1);
      } catch (e) {
        console.error(e);
      }
    });

    it("5. Should have no collections", async function() {
      try {
        const collectionsCount = await this.marketPlace.getCollectionsCount();
        expect(collectionsCount).to.equal(0);
      } catch (e) {
        console.error(e);
      }
    });

    it("6. Should change name", async function() {
      try {
        const name = await this.marketPlace.getName();
        const setNameTx = await this.marketPlace.setName("Plutonium 2.0");
        // wait until the transaction is mined
        await setNameTx.wait();
        const newName = await this.marketPlace.getName();
        expect(name).not.to.equal(newName);
        expect(newName).to.equal("Plutonium 2.0");
        expect(newName).not.to.equal("");
        expect(newName).not.to.equal(null);
        expect(newName).not.to.equal(undefined);
      } catch (e) {
        console.error(e);
      }
    });

    it("7. Should revert empty name", async function() {
      try {
        await this.marketPlace.setName("");
      } catch (e: any) {
        expect(e.message.includes("revert")).to.equal(true);
      }
    });

    it("8. Should revert zero fee", async function() {
      try {
        await this.marketPlace.setFee(0);
      } catch (e: any) {
        expect(e.message.includes("revert")).to.equal(true);
      }
    });

    it("9. Should change fee", async function() {
      try {
        const fee = await this.marketPlace.getFee();
        const setFeeTx = await this.marketPlace.setFee(2);
        await setFeeTx.wait();
        const newFee = await this.marketPlace.getFee();
        expect(fee).not.to.equal(newFee);
        expect(newFee).to.equal(2);
      } catch (e) {
        console.error(e);
      }
    });


    it("10. Create new collection", async function() {
      try {
        // 0. check user balance on market
        expect(await this.marketPlace.getUserFunds(this.owner.address)).to.equal(0);
        expect(await this.marketPlace.getUserFunds(this.buyer.address)).to.equal(0);
        expect(await this.marketPlace.getUserFunds(this.seller.address)).to.equal(0);

        // 1. Create empty collection
        let collectionName = "Art";
        let collectionSymbol = "TKN";
        let collectionDescription = "Modern Art Collection";
        let collectionFee = 1;
        let collectionPrice = 100;

        // 2. Deploy contract
        let collectionContract1 = await this.CollectionContract
          .deploy(collectionName, collectionSymbol);

        await collectionContract1.deployed();

        // 3. Test contract address
        let address = collectionContract1.address;

        expect(address).not.to.equal("");
        expect(address).not.to.equal(0x0);
        expect(address).not.to.equal(null);
        expect(address).not.to.equal(undefined);

        // 4. Mint Collection
        let createCollectionTx = await this.marketPlace
          .connect(this.owner)
          .createCollection(collectionName, collectionSymbol, collectionDescription, collectionFee, collectionPrice, collectionContract1.address, this.owner.address);

        await createCollectionTx.wait();

        // collection count should increase
        let collectionsCount = await this.marketPlace.getCollectionsCount();
        expect(collectionsCount).to.equal(1);

        let createdCollection1 = await this.marketPlace.getCollection(collectionsCount);

        expect(createdCollection1.id).to.equal(collectionsCount);
        expect(createdCollection1.name).to.equal(collectionName);
        expect(createdCollection1.symbol).to.equal(collectionSymbol);
        expect(createdCollection1.description).to.equal(collectionDescription);
        expect(createdCollection1.nftCollection).to.equal(address);
        expect(createdCollection1.owner).to.equal(this.owner.address);
        expect(createdCollection1.creator).to.equal(this.owner.address);
        expect(createdCollection1.fulfilled).to.equal(false);
        expect(createdCollection1.cancelled).to.equal(false);

        // no tokens in collection
        let totalSupply = await collectionContract1.totalSupply();
        expect(totalSupply).to.equal(0);

        // 5. Create first token
        let token = await collectionContract1
          .connect(this.owner)
          .safeMint("testURI");

        let result = await token.wait();

        totalSupply = await collectionContract1.totalSupply();

        expect(totalSupply).to.equal(1);
        expect(result.to).to.be.equal(collectionContract1.address);
        expect(result.from).to.be.equal(this.owner.address);

        // SUCCESS
        let event = result.events[0].args;
        expect(event.tokenId.toNumber(), totalSupply, "id is correct");
        expect(event.from, "0x0000000000000000000000000000000000000000", "from is correct");
        expect(event.to, this.owner.address, "to is correct");

        // check token balance
        expect(await collectionContract1.balanceOf(this.owner.address)).to.be.equal(1);
        expect(await collectionContract1.balanceOf(this.buyer.address)).to.be.equal(0);
        expect(await collectionContract1.balanceOf(this.seller.address)).to.be.equal(0);

        expect(await collectionContract1.balanceOf(this.marketPlace.address)).to.be.equal(0);

        expect(await collectionContract1.ownerOf(totalSupply)).to.be.equal(this.owner.address);

        // 6. Add token to collection
        await collectionContract1.connect(this.owner)
          .setApprovalForAll(this.marketPlace.address, true);

        let price = ethers.utils.parseUnits("1", "ether");

        let createTx = await this.marketPlace
          .connect(this.owner)
          .createCollectible(event.tokenId, createdCollection1.id, price, { from: this.owner.address });

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
          .createCollectible(event.tokenId, createdCollection1.id, price, { from: this.owner.address });

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
          .createCollectible(event.tokenId, createdCollection1.id, price, { from: this.owner.address });

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
        collectionFee = 2;
        collectionPrice = 100;
        let collectionContract2 = await this.CollectionContract.deploy(collectionName, collectionSymbol);
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

        price = ethers.utils.parseUnits("1", "ether");

        createTx = await this.marketPlace
          .connect(this.seller)
          .createCollectible(event.tokenId, createdCollection2.id, price, { from: this.seller.address });

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
          .createCollectible(event.tokenId, createdCollection2.id, price, { from: this.seller.address });

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
          .createCollectible(event.tokenId, createdCollection2.id, price, { from: this.buyer.address });

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
        expect(token.price).to.be.equal(ethers.utils.parseUnits("1", "ether"));
        // check token owner before buy
        expect(token.owner).to.be.equal(this.owner.address);
        expect(token.creator).to.be.equal(this.owner.address);
        expect(token.fulfilled).to.be.equal(false);
        expect(token.cancelled).to.be.equal(false);

        // check token owner before buy

        let totalPrice1 = token.price.add(firstCollection.fee.mul(token.price).div(100));

        // try to buy first token from first collection by buyer
        let buyTx = await this.marketPlace
          .connect(this.buyer)
          .buyCollectible(token.collectionId, token.id, { from: this.buyer.address, value: totalPrice1 });

        result = await buyTx.wait();
        args = result.events[1].args;

        expect(args.id).to.be.equal(1);
        expect(args.collectionId).to.be.equal(firstCollection.id);
        expect(args.tokenId).to.be.equal(1);
        expect(args.price).to.be.equal(ethers.utils.parseUnits("1", "ether"));
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

        let totalPrice2 = token.price.add(firstCollection.fee.mul(token.price).div(100));

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

        let totalPrice3 = token.price.add(firstCollection.fee.mul(token.price).div(100));

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
        expect(token.price).to.be.equal(ethers.utils.parseUnits("1", "ether"));
        expect(token.owner).to.be.equal(this.seller.address);
        expect(token.creator).to.be.equal(this.seller.address);
        expect(token.fulfilled).to.be.equal(false);
        expect(token.cancelled).to.be.equal(false);

        let totalPrice4 = token.price.add(secondCollection.fee.mul(token.price).div(100));

        // try to buy first token from first collection by buyer
        buyTx = await this.marketPlace
          .connect(this.buyer)
          .buyCollectible(token.collectionId, token.id, { from: this.buyer.address, value: totalPrice4 });

        result = await buyTx.wait();
        args = result.events[1].args;

        expect(args.id).to.be.equal(1);
        expect(args.collectionId).to.be.equal(secondCollection.id);
        expect(args.tokenId).to.be.equal(1);
        expect(args.price).to.be.equal(ethers.utils.parseUnits("1", "ether"));
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

        let totalPrice5 = token.price.add(secondCollection.fee.mul(token.price).div(100));

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

        let totalPrice6 = token.price.add(secondCollection.fee.mul(token.price).div(100));

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
          .createCollectible(event.tokenId, createdCollection1.id, price, { from: this.seller.address });

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
        buyTx = await this.marketPlace
          .connect(this.buyer)
          .buyCollectible(createdCollection1.id, tokenId, { from: this.buyer.address, value: price.add(createdCollection1.fee.mul(price).div(100)) });

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

        console.log(await this.marketPlace.getCollectible(createdCollection1.id, 3));
        await collectionContract1.connect(this.buyer)
          .setApprovalForAll(this.marketPlace.address, true);

        console.log(this.owner.address);
        console.log(this.buyer.address);
        console.log(this.seller.address);
        console.log(this.marketPlace.address);

        const sellTx = await this.marketPlace.connect(this.buyer).sellCollectible(createdCollection1.id, 3, price.mul(21));
        console.log(sellTx);
        result = await sellTx.wait();
        console.log(result);
        expect((await this.marketPlace.getCollectible(createdCollection1.id, 3)).owner).to.equal(this.buyer.address);

        expect(await collectionContract1.balanceOf(this.marketPlace.address)).to.be.equal(1); // done.

        // keep collectible owner by buyer, but ownerOf is marketPlace as it was done for just created
        expect(await collectionContract1.ownerOf(3)).to.be.equal(this.marketPlace.address);

        expect(await this.marketPlace.getUserFunds(this.owner.address)).to.equal(0);
        expect(await this.marketPlace.getUserFunds(this.buyer.address)).to.equal(totalPrice1.add(totalPrice2).add(totalPrice3).add(totalPrice4).add(totalPrice5).add(totalPrice6)
          .add(price.add(createdCollection1.fee.mul(price).div(100)))); // add funds for second token
        expect(await this.marketPlace.getUserFunds(this.seller.address)).to.equal(0);


        // claim funds
        const funds = await this.marketPlace
          .connect(this.buyer).getUserFunds(this.buyer.address);

        const claimTx = await this.marketPlace
          .connect(this.buyer).claimFunds({ from: this.buyer.address, value: funds });
        result = await claimTx.wait();
        expect(await this.marketPlace.connect(this.buyer).getUserFunds(this.buyer.address)).to.equal(0);
      } catch (e) {
        console.error(e);
      }
    });

  });
});

