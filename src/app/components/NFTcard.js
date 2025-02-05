import React from 'react'

function NFTcard({ nft }) {
    return (
        <div className='w-1/4 flex flex-col'>
            <div className='rounded-md'>
                <img
                    src={nft.image.pngUrl}
                    className='w-full rounded-t-md h-128 object-cover'
                />
            </div>
            <div className='flex flex-col gap-y-2 px-2 py-3 bg-slate-100 rounded-b-md h-110'>
                <div>
                    <h2 className='text-xl text-gray-800'>
                        {nft.name}
                    </h2>
                    <p className='text-gray-600'>
                        {nft.tokenId.substr(nft.tokenId.length - 4)}
                    </p>
                    <p className='text-gray-600'>
                        {`${nft.contract.address.substr(0, 5)}...${nft.contract.address.substr(nft.contract.address.length - 4)}`}
                    </p>
                </div>
                <div className='flex-grow mt-2'>
                    <p className='text-gray-600'>
                        {nft.description?.substr(0, 150)}
                    </p>
                </div>
                <div className='flex justify-center mb-1'>
                    <a
                        target="_blank"
                        href={`https://etherscan.io/token/${nft.contract.address}`}
                        className="py-2 px-4 bg-blue-500 w-1/2 text-center rounded-md text-white cursor-pointer"
                    >View on Etherscan</a>
                </div>
            </div>
        </div>

    )
}

export default NFTcard
