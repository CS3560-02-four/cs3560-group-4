export default function Page({ params }: { params: { rentalId: string }}) {
    return (
        <div>{params.rentalId}</div>
    );
}