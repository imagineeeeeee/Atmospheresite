from flask import Flask, jsonify
import discord

BOT_TOKEN = "MTIxOTg2ODk2Mzg4Mjc5OTIxMw.GVDWff.ui1azi2Q0F8CSa1X5gcuidiocEGZrxiEdc81bk"

app = Flask(__name__)

client = discord.Client(intents=discord.Intents.all())

@app.route("/get_server_count")
def get_server_count():
    try:
        # Connect to Discord using the securely retrieved bot token
        client.run(BOT_TOKEN)  # This line will connect and block until disconnected
        count = len(client.guilds)
        return jsonify({"server_count": count})
    except Exception as e:  # Catch any errors during connection or data retrieval
        print(f"Error fetching server count: {e}")
        return jsonify({"error": "Error fetching server count"}), 500  # Internal Server Error

if __name__ == "__main__":
    app.run()
