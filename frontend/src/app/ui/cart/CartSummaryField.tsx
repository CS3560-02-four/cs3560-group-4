export default function CartSummaryField() {
    return ( // form
        //Pickup datetime field
        //Return datetime field
        //Confirm rental button
        <div>
            <form action="" className="flex flex-col shadow-md gap-4 p-5 h-[80%] justify-between">
                <div className="text-green-900 text-xl">Pick your pickup and return time.</div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="pickup">Pickup Time</label>
                    <input type="datetime-local" name="pickup" className="" />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="return">Return Time</label>
                    <input type="datetime-local" name="return" />
                </div>
                <input type="submit" value="Confirm Rental" className="bg-green-900 text-white rounded text-sm p-2 font-medium cursor-pointer"/>
            </form>
        </div>
    );
}