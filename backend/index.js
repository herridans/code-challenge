import server from "./server.js";
import mongoose from "mongoose";

(async() => {
    try
    {
        let uri = `mongodb+srv://herridans:hn5gh2mi0Chv4FfA@cluster0.ubbjz.mongodb.net/db?retryWrites=true&w=majority`;
        let db = await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        
        server.listen(8000, () => {
            console.log("Server is running on port 8000")
        });
    }

    catch(err)
    {
        console.log(err);
    }
})();