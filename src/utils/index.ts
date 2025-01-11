export const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-PE', {
        style: "currency",
        currency: 'PEN'
    }).format(amount)
}

export const getImagePath = (imagePath: string) => {
    const check = imagePath.startsWith('https://res.cloudinary.com')
    if (check) {
        return imagePath
    } else {
        return `/products/${imagePath}.jpg`
    }
}