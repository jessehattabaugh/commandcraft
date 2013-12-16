commandcraft
============

Web based gui for constructing Minecraft commands

Live at http://commandcraft.herokuapp.com/

Recently Mojang added command blocks to Minecraft that let you issue powerful commands. Using these players can do all sorts of neat things like make fireworks appear, /give players enchanted items, /playsound , or /summon a skeleton riding a horse. Unfortunately these commands can get very long, and complicated as you can see from the following documentation:

Minecraft Commands: http://minecraft.gamepedia.com/Commands

Minecraft Data Values: http://minecraft.gamepedia.com/Data_values

Minecraft Chunk Format: http://minecraft.gamepedia.com/Chunk_format

Minecraft NBT Format: http://minecraft.gamepedia.com/NBT_Format

So I decided to make it easier.

I'm using Heroku to host a node server which uses node-restful to serve a REST API to a MongoLab hosted MongoDB. The frontend code uses jQuery for Ajax, and Knockout for databinding. 
