const Sort = () => {
    return (
        <div className="dropdown dropdown-bottom dropdown-end">
            <label tabIndex={0} className="btn btn-outline btn-xs me-4 mb-4">Sort</label>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-info-content rounded-box w-52">
                <li><a>Added order</a></li>
                <li><a>Update order</a></li>
            </ul>
        </div>
    )
}

export default Sort;