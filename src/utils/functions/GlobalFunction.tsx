class GlobalFunction {
    public formateToRupiah(number: number) {
        return Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(number);
    }
}

export default new GlobalFunction();