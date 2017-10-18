/**
 * Return the available payment options for given checkout
 */
function getPaymentOptions(checkout) {
    return [
        {
            id: 'bankTransfer',
            label: {
                en: 'Bank Transfer',
                pt: 'Transferência Bancária'
            }
        },
        {
            id: 'paymentOnDelivery',
            label: {
                en: 'Payment on Delivery',
                pt: 'Envio à Cobrança'
            }
        },
        {
            id: 'creditCard',
            label: {
                en: 'Credit Card',
                pt: 'Cartão de Crédito'
            }
        }
    ];
}

/**
 * Exports
 */
export {getPaymentOptions};
