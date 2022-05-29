const replaceTemplate = (template, product) => {

    let outputObj = template.replace(/{%PRODUCTNAME%}/g, product.productName)
    outputObj = outputObj.replace(/{%PRICE%}/g, product.price)
    outputObj = outputObj.replace(/{%IMAGE%}/g, product.image)
    outputObj = outputObj.replace(/{%QUANTITY%}/g, product.quantity)
    outputObj = outputObj.replace(/{%ID%}/g, product.id)
    outputObj = outputObj.replace(/{%FROM%}/g, product.from)
    outputObj = outputObj.replace(/{%NUTRIENTS%}/g, product.nutrients)
    outputObj = outputObj.replace(/{%DESCRIPTION%}/g, product.description)

    if (!product.organic)
        outputObj = outputObj.replace(/{%NOT_ORGANIC%}/g, 'not-organic')
    return outputObj;
}

module.exports = { replaceTemplate };