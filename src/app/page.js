'use client'
import Image from "next/image";
import { useState } from "react";
import NFTcard from "./components/NFTcard";

export default function Home() {

  const [wallet, setWalletAddress] = useState("");
  const [collection, setCollectionAddress] = useState("");
  const [NFTs, setNFTs] = useState([]);
  const [fetchCollection, setFetchCollection] = useState(false);



  /**
   * @dev method to fetch NFTs/NFTs of a collection owned by a wallet address
   */
  const fetchNFT = async () => {
    let nfts;
    const options = {
      method: 'GET',
      headers: { accept: 'application/json' }
    };
    const baseURL = 'https://eth-mainnet.g.alchemy.com/nft/v3/Tq2cnLKs8kJELEQsmaykEvhDmO3HDcva/getNFTsForOwner/';

    if (!collection.length) {

      console.log("Fetching NFTs owned by the Wallet");

      const fetchURL = `${baseURL}?owner=${wallet}`;

      nfts = await fetch(fetchURL, options)   // get the response in string format
        .then(response => response.json())    // change it to json format
        .then(response => { setNFTs(response.ownedNfts) })
        .catch(error => console.log(error));

    }
    else {

      console.log("Fetching NFTs of the collection owned by the wallet");
      // URL to fetch collection
      const fetchURL = `${baseURL}?owner=${wallet}&contractAddresses[]=${collection}`;
      // Get NFTs 
      nfts = await fetch(fetchURL, options)
        .then(response => response.json())
        .then(nfts => setNFTs(nfts.ownedNfts))
        .then(response => { setNFTs(response.ownedNfts) })
        .catch(error => console.log(error));

    }

  }



  /**
   * @dev method to fetch all NFTs of a collection
   */
  const fetchNFTCollection = async () => {
    if (collection.length) {
      console.log("Fetching NFTs of the collection");
      let nfts;
      const options = {
        method: 'GET',
        headers: { accept: 'application/json' }
      };

      // getNFTsForContract()
      const baseURL = 'https://eth-mainnet.g.alchemy.com/nft/v3/Tq2cnLKs8kJELEQsmaykEvhDmO3HDcva/getNFTsForContract/';

      const fetchURL = `${baseURL}?contractAddress=${collection}&withMetadata=${"true"}`;

      nfts = await fetch(fetchURL, options)
        .then(response => response.json())
        .then(response => { setNFTs(response.nfts) })
        .catch(error => console.log(error));

    }
  }



  return (
    <div className="flex flex-col items-center justify-center py-8 gap-y-3">
      <h1 className="flex justify-center items-center w-2/5 text-xl tracking-widest font-semibold m-5">
        NFT GALLERY
      </h1>
      <div className="flex flex-col w-full items-center justify-center gap-y-2">
        <input
          type="text"
          placeholder="Add wallet address"
          className="w-2/5 bg-slate-100 py-2 px-2 rounded-lg text-gray-800 focus:outline-blue-300 disabled:bg-slate-50 disabled:text-gray-50"
          onChange={(e) => { setWalletAddress(e.target.value) }}
          disabled={fetchCollection}
          value={wallet}
        />
        <input
          type="text"
          placeholder="Add collection address"
          className="w-2/5 bg-slate-100 py-2 px-2 rounded-lg text-gray-800 focus:outline-blue-300 disabled:bg-slate-50 disabled:text-gray-50"
          onChange={(e) => { setCollectionAddress(e.target.value) }}
          value={collection}
          required={fetchCollection}
        />
        <label>
          <input
            type="checkbox"
            className="mr-2"
            onChange={(e) => { setFetchCollection(e.target.checked) }}
          />
          Get Collection
        </label>
        <button
          className="disabled:bg-slate-500 text-white bg-blue-400 px-4 py-2 mt-3 rounded-sm w-1/5"
          onClick={
            () => {
              if (fetchCollection) {
                fetchNFTCollection();
              }
              else {
                fetchNFT();
              }
            }
          }>
          GET NFT
        </button>
      </div>
      <div className="flex flex-wrap gap-y-12 gap-x-2 mt-4 w-5/6 justify-center text-[#0a0a0a]">
        {
          NFTs.length && NFTs.map((nft) => {
            return (
              <NFTcard
                key={nft.tokenId}
                nft={nft} />
            )
          })
        }
      </div>
    </div>
  );
}
