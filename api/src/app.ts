import Server from "./server"

const main = async () => {
    try {
        // await connect to db

        const server = new Server(5000)

        server.run()
    } catch (error) {
        console.error(error)
    }
}

main()