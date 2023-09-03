"use client";
import Image, { StaticImageData } from 'next/image'
import breakfast from '../../../../public/media/recipes/strawberryCake.jpg'
import Rating from '@/app/components/generic/rating'
import Button from '@/app/components/generic/button'
import { FaBookmark, FaRegBookmark, FaClock } from 'react-icons/fa'
import { BsClock, BsBookFill, BsCardList, BsShopWindow } from 'react-icons/bs'
import { useState } from 'react'

export default function RecipePage(){
    const [isSaved, setSaved] = useState(false)
    return(
        <main className="flex flex-col m-auto max-xl:mx-3 gap-4">
            <section id="header-section" className='max-w-7xl h-112 min-h-fit bg-black/90 flex m-auto w-full rounded-xl mt-4 shadow-md shadow-black/40 overflow-clip'>
                <div id="image-section" className="w-112 shrink-0 h-full relative">
                    <Image src={breakfast} layout="fill" objectFit="cover" alt="Breakfast Photo"/>
                </div>
                <div id="title-section" className="p-8 flex text-white ">
                    <div className="flex flex-col self-center">
                        <div className='flex place-content-between content-center mb-6'>
                            <h1 className="font-bold text-4xl">Easy Fresh Strawberry Pie</h1>
                            <Rating rating={4.2}/>
                        </div>
                        <h2 className="text-xl">
                            Made with fresh strawberries, this pie is a sweet and unique dessert option. 
                            Strawberry pie is a classic American dessert made with fresh strawberries, sugar, and a pie crust. It is a sweet and delicious treat that is perfect for any occasion.
                        </h2>
                        <div className="flex flex-row place-content-between mt-10">
                            <div className="flex gap-2">
                                <BsClock className="h-4 w-4 place-self-center"/> 
                                <p className="place-self-center text-white/80">
                                    Preparation time: 120 minutes
                                </p>
                            </div>
                            <Button className="bg-slate-700/40 hover:bg-vermilion-500/90 active:opacity-80 text-sm font-normal py-1 transition-all flex items-center gap-2"
                                onClick={() => setSaved(x => !x)}> 
                                {isSaved ? <>Saved <FaBookmark/></> : <>Save <FaRegBookmark/></>}
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
            
            <section id="ingredients-section" className='max-w-7xl bg-black m-auto w-full text-lg p-8 rounded-xl mt-4 shadow-md shadow-black/40 text-white'>
                <h2 className="text-4xl font-semibold flex gap-2 mb-6">
                    <BsShopWindow className="h-7 w-7 place-self-center fill-vermilion-400"/> 
                    Igredients
                </h2>
                <h2 className="text-xl mb-5">
                    What you'll need:
                </h2>
                <p>
                    <ul className="list-disc ml-10">
                        <li>
                        4 cups fresh strawberries, hulled and sliced
                        </li>
                        <li>
                        1 cup sugar
                        </li>
                        <li>
                        3 tablespoons cornstarch
                        </li>
                        <li>
                        1 tablespoon lemon juice
                        </li>
                        <li>
                        Bake in the preheated oven for 45 minutes, or until the crust is golden brown and the filling is bubbling.
                        </li>
                        <li>
                        Let the pie cool completely before serving.
                        </li>
                        <br/>
                    </ul>
                    <p>
                    You can adjust the amount of sugar to your taste. If you like your pie sweeter, add an extra 1/2 cup of sugar. If you prefer a tarter pie, reduce the amount of sugar to 3/4 cup.
                    </p>

                    <br/>
                    
                    <p>
                    You can also add other ingredients to the filling, such as:
                    </p>
                    
                    <br/>

                    <ul className="list-disc ml-10">
                        <li>Vanilla extract</li>
                        <li>A splash of liqueur, such as Chambord or Grand Marnier</li>
                        <li>A dollop of whipped cream</li>
                    </ul>
                </p>
            </section>

            <section id="recipe-section" className='max-w-7xl bg-black text-lg mb-8 m-auto w-full p-8 rounded-xl text-white mt-4 shadow-md shadow-black/40'>
                <h2 className="text-4xl font-semibold flex gap-2 mb-6">
                    <BsCardList className="h-7 w-7 place-self-center fill-vermilion-400"/> 
                    Instructions
                </h2>

                <p>
                The best strawberries for pie are sweet and ripe, with a deep red color. The strawberries are typically sliced or halved and then cooked with sugar and cornstarch until they are soft and juicy. The filling is then poured into a pie crust and baked until the crust is golden brown and the filling is bubbling.<br/>
                <br/>
                Strawberry pie can be served plain or with whipped cream, ice cream, or a dollop of yogurt. It is a popular dessert for summer picnics and potlucks, and it is also a delicious way to use up fresh strawberries from the garden.<br/>
                <br/>
                <h2 className="text-xl mb-5">
                    Steb by step:
                </h2>
                <ol className="list-disc ml-10">
                    <li>
                    Preheat oven to 375 degrees Fahrenheit.
                    </li>
                    <li>
                    Prepare a pie crust and line a 9-inch pie plate with it.
                    </li>
                    <li>
                    In a large bowl, combine the strawberries, sugar, and cornstarch. Stir until the strawberries are coated in the sugar mixture.<br/>
                    </li>
                    <li>
                    Pour the strawberry filling into the prepared pie crust.
                    </li>
                    <li>
                    Bake in the preheated oven for 45 minutes, or until the crust is golden brown and the filling is bubbling.
                    </li>
                    <li>
                    Let the pie cool completely before serving.
                    </li>
                    <br/>
                </ol>
                Here are some tips for making the best strawberry pie:
                <br/>
                <br/>
                <ul className="list-decimal ml-10">
                    <li>Use fresh, ripe strawberries.</li>
                    <li>Don't overcook the filling. The strawberries should be soft but still retain their shape.</li>
                    <li>Let the pie cool completely before serving. This will help the filling set and prevent it from getting runny.</li>
                </ul>
                <br/>
                <span className="font-semibold text-2xl">Enjoy!</span>
                </p>
            </section>
        </main>
    )
}

function RecipeHeader({rating = 0, title, desc, tags = [], saved,}: 
    {rating: number | undefined, title: string | undefined, desc: string | undefined, tags: string[], image: StaticImageData | string, saved: boolean }){
    const [isSaved, setSaved] = useState(saved)
    return(
        <>
        <div className="flex justify-between items-center">
                <h1 className="text-2xl cursor-pointer bg-clip-text hover:text-transparent bg-gradient-to-r from-vermilion-500 to-vermilion-400">{title ?? "Recipe Name"}</h1>
                <Rating rating={rating}/>
                </div>
                <div className="flex justify-between items-center pt-5">
                <p className="text-white/60">{desc ?? "Description"}</p>
                </div>
                <div className="flex justify-between items-center pt-5">
                {tags.map(x => <Button className="bg-slate-500/20 hover:bg-slate-500/40 text-sm font-thin py-1" onClick={undefined}>{x}</Button>)} 
                <Button className="bg-slate-700/40 hover:bg-vermilion-500/90 active:opacity-80 text-sm font-normal py-1 transition-all flex items-center gap-2"
                    onClick={() => setSaved(x => !x)}> 
                    {isSaved ? <>Saved <FaBookmark/></> : <>Save <FaRegBookmark/></>}
                </Button>
        </div>
        </>
    )
}