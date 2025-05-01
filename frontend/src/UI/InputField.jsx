export default function InputField({ id, label, type , name}){
    return (
      <div>
        <label htmlFor={id} className="block text-sm font-medium ">
          {label}
        </label>
        <input
          id={id}
          name={name}
          type={type}
          required
          className="w-full px-3 py-2 mt-1 bg-slate-500 border border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
    );
  };
  
  