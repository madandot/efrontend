import React from 'react';
import { FaTruck } from 'react-icons/fa';
import { GiTwoCoins } from 'react-icons/gi';
import { HiChevronDoubleRight } from 'react-icons/hi';
import { BsHouseDoorFill } from 'react-icons/bs';
import { SiSamsung } from 'react-icons/si';
import { AiFillApple } from 'react-icons/ai';
import { SiOneplus } from 'react-icons/si';
import { Link } from 'react-router-dom';
const Home = () => {
	return (
		<section className=' py-5'>
			<div className=' max-w-6xl mx-auto'>
				<div className=' py-36'>
					<p className='text-4xl text-center font-bold max-w-xl mx-auto'>
						Shop Anytime, Anywhere with Our Mobile Shopping Website
					</p>
					<div className=' flex justify-center mt-10 '>
						<Link to='/collections/all' className=' bg-[#5206e0] text-white px-5 py-2 rounded '>
							Shop Now
						</Link>
					</div>
				</div>
				<div className=' py-5'>
					<p className=' text-4xl text-center font-bold'>Available in Brands</p>
					<div className=' grid grid-cols-3  gap-5 pt-5'>
						<Link to={'/collections/samsung'}>
							<div className=' flex flex-col justify-center items-center  space-y-3 bg-gray-300 p-5 rounded'>
								<SiSamsung className=' text-9xl ' />
							</div>
						</Link>
						<Link to={'/collections/apple'}>
							<div className=' flex flex-col h-full justify-center items-center  space-y-3 bg-gray-300 p-5 rounded'>
								<AiFillApple className=' text-8xl ' />
							</div>
						</Link>
						<Link to={'/collections/oneplus'}>
							<div className=' flex flex-col h-full justify-center items-center  space-y-3 bg-gray-300 p-5 rounded'>
								<SiOneplus className=' text-8xl ' />
							</div>
						</Link>
					</div>
				</div>
				<div className='py-5 my-10'>
					<p className=' text-4xl text-center font-bold'>Why Buy From Lavish</p>
					<p className=' text-2xl mt-2 text-center font-bold'>A Unique Delivery Experience With Our Company</p>
					<div className=' grid grid-cols-4 gap-5 pt-10 '>
						<div className=' flex flex-col justify-center items-center  space-y-3 bg-gray-300 p-5 rounded'>
							<FaTruck className=' text-5xl ' />
							<p className=' text-lg font-semibold'>Delivery Within Oneday</p>
						</div>
						<div className=' flex flex-col justify-center items-center  space-y-3 bg-gray-300 p-5 rounded'>
							<GiTwoCoins className=' text-5xl ' />
							<p className=' text-lg font-semibold'>Choice Of Finance Partners</p>
						</div>
						<div className=' flex flex-col justify-center items-center  space-y-3 bg-gray-300 p-5 rounded'>
							<HiChevronDoubleRight className=' text-5xl ' />
							<p className=' text-lg font-semibold'>Exchange Support</p>
						</div>
						<div className=' flex flex-col justify-center items-center  space-y-3 bg-gray-300 p-5 rounded'>
							<BsHouseDoorFill className=' text-5xl ' />
							<p className=' text-lg font-semibold'>Services At Your Doorstep</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Home;
