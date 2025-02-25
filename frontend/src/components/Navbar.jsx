export default function Navbar({ onOpen }) {
    return (
        <>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <a className="btn btn-ghost text-xl">ProductsManager</a>
                </div>
                <div className="navbar-center">
                    <div className="form-control">
                        <input type="text" placeholder="Search" className=" input input-bordered w-48 md:w-auto" />
                    </div>
                </div>
                <div className="navbar-end">
                    <button onClick={onOpen} className="btn btn-primary">Add Client</button>
                </div>
            </div>
        </>
    )
}