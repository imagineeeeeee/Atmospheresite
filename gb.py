from flask import Flask, jsonify
import discord

app = Flask(__name__)

client = discord.Client()  # Replace with your Discord bot client

@app.route("/get_server_count")
def get_server_count():
    count = len(client.guilds)
    return jsonify({"server_count": count})

if __name__ == "__main__":
    app.run()
