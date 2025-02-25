export default function Navbar({ onOpen, onSearch }) {
    const handleSearch = (e) => {
        const searchTerm = e.target.value.toLowerCase();
        onSearch(searchTerm);
    };

    return (
        <>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <a className="btn btn-ghost text-xl">ProductsManager</a>
                </div>
                <div className="navbar-center">
                    <div className="form-control">
                        <input 
                            type="text" 
                            placeholder="Search by name, SKU or brand..." 
                            className="input input-bordered w-64 md:w-96"
                            onChange={handleSearch}
                        />
                    </div>
                </div>
                <div className="navbar-end">
                    <button onClick={onOpen} className="btn btn-primary">Add Product</button>
                </div>
            </div>
        </>
    )
}