import swaggerJSDoc from 'swagger-jsdoc'

const swaggerOptions = {
    definition: {
        openapi: '1.0.1',
        info: {
            title: 'Documentacion de la API del Proyecto de Backend de Coderhouse',
            description: 'Proyecto final del curso de backend de Coderhouse de Augusto Salmoiraghi',
        }
    },
    apis: ['./docs/**/*.yaml']
}

const specs = swaggerJSDoc(swaggerOptions)

export default specs