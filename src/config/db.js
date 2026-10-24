import mongoose from "mongoose";

export async function connectDB() {
    const url = process.env.MONGO_URL;

    if (!url) {
        console.error("MONGO_URL tidak ditemukan di file .env");
        process.exit(1);
    }

    mongoose.connection.on("error", (err) => {
        console.error("Koneksi ke MongoDB gagal:", err.message);
    });

    mongoose.connection.on("disconnected", () => {
        console.warn("Koneksi ke MongoDB terputus.");
    });

    try {
        await mongoose.connect(url, {
            serverSelectionTimeoutMS: 5000,
        });
        console.log("Terhubung ke MongoDB");
    } catch (error) {
        console.error("Koneksi ke MongoDB gagal:", error.message);
        process.exit(1);
    }
}
