export default function CartSummaryField() {
    return ( // form
        //Pickup datetime field
        //Return datetime field
        //Confirm rental button
        <form action="">
            <div>
                <label htmlFor="pickup"></label>
                <input type="datetime-local" name="pickup" />
            </div>
            <div>
                <label htmlFor="return"></label>
                <input type="datetime-local" name="return" />
            </div>
            <input type="submit" value="Confirm Rental" />
        </form>
    );
}