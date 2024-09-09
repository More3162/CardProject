export default function normalizeUser(input) {
    return {
        name: {
            first: input.first,
            middle: input.middle,
            last: input.last,
        },
        phone: input.phone,
        email: input.email,
        password: input.password,
        image: {
            url: input.url,
            alt: input.alt,
        },
        address: {
            state: input.state,
            country: input.country,
            city: input.city,
            street: input.street,
            houseNumber: input.houseNumber,
            zip: input.zip
        },
        isBusiness: input.isBusiness
    }
};

// { user: { first: 'first', middle: 'middle', last: 'last' }, phone: 'phone', email: 'email', password: 'password', image: { url: 'url', alt: 'alt' }, address: { state: 'state', country: 'country', city: 'city', street: 'street', houseNumber: 'houseNumber', zip: 'zip' }, isBusiness: 'isBusiness' }