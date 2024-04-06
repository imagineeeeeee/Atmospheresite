from flask import Flask, jsonify
import discord

BOT_TOKEN = BOT
app = Flask(__name__)

client = discord.Client(intents=discord.Intents.all())

@app.route("/get_server_count")
def get_server_count():
    count = len(client.guilds)
    return jsonify({"server_count": count})

if __name__ == "__main__":
    app.run()

