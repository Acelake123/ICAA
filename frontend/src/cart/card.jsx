

export default function Card({title, eth, price}) {
  return (
       <div className="bg-gray-800 shadow rounded-lg p-6 row-span-1">
            <h2 className="text-xl font-semibold">{title}</h2>
            <p className="text-2xl mt-2">{eth}</p>
            <p className="text-green-500 mt-1">{price}</p>
          </div>
  );
};
