import { ServerClient } from "postmark"

const client = new ServerClient(process.env.POSTMARK_API_KEY || "")
export default client
