import { NextApiRequest, NextApiResponse } from 'next';
import { CollectImg, PrismaClient, TourType } from '@prisma/client';
import { apiHandler } from 'helpers/api';
import { saveFile } from 'services/file';
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method == "OPTIONS") {
        res.setHeader("Allow", "POST");
        return res.status(202).json({});
    }

    if (req.method === 'GET') {
        const result = await GetCollections();

        if (!result) {
            return res.status(400).json({ error: 'Invalid collection ID' });
        }

        return res.json({ ...result });
    } else if (req.method === 'PUT') {
        const collection = req.body;

        const result = await UpdateCollection(collection);
        if (!result) {
            return res.status(500).json({ error: 'Failed to update the collection' });
        }

        return res.json({ ...result });
    } else if (req.method === 'POST') {
        const collection = req.body;

        const result = await AddCollection(collection);

        if (!result) {
            return res.status(500).json({ error: 'Failed to create a new book' });
        }

        return res.json({ ...result });
    } else if (req.method === 'DELETE') {
        const { collectionId } = req.query;

        const result = await DeleteCollection(parseInt(collectionId?.toString() || "0"));

        if (!result) {
            return res.status(500).json({ error: 'Failed to delete a collection' });
        }

        return res.json({ ...result });
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
};

const GetCollections = async () => {
    try {
        const collections = await prisma.collectImg.findMany();

        if (collections) {
            return {
                data: collections,
                message: "Success",
                status: "200"
            };
        } else {
            return {
                data: null,
                message: "No Success",
                status: "500"
            };
        }
    } catch (error) {
        console.error(error);
        return {
            tour: null,
            message: "Internal Server Error",
            status: "500"
        };
    }
}

const AddCollection = async (collection: CollectImg) => {
    try {

        const filename = await saveFile(collection.Src, collection?.CollectImgId || collection?.Name);

        const collectImg = await prisma.collectImg.create({
            data: {
                Name: collection.Name,
                Src: filename,
                TourTypeId: collection.TourTypeId
            },
        });

        if (collectImg) {
            return {
                collectImg: collectImg,
                message: "Success",
                status: "200"
            };
        } else {
            return {
                tour: null,
                message: "No Success",
                status: "500"
            };
        }
    } catch (error) {
        console.error(error);
        return {
            tour: null,
            message: "Internal Server Error",
            status: "500"
        };
    }
}

const UpdateCollection = async (collectImg: CollectImg) => {
    try {
        const filename = await saveFile(collectImg.Src, collectImg.CollectImgId);

        const updateCollection = await prisma.collectImg.update({
            where: {
                CollectImgId: collectImg?.CollectImgId
            },
            data: {
                Name: collectImg.Name,
                Src: filename,
                TourTypeId: collectImg.TourTypeId
            },
        });

        return {
            data: updateCollection,
            message: "Success",
            status: "200"
        };
    } catch (e) {
        console.error(e);
        return {
            data: null,
            message: "Internal Server Error",
            status: "500"
        };
    }
}

const DeleteCollection = async (collectionId: number) => {
    try {

        await prisma.collectImg.deleteMany({
            where: {
                CollectImgId: collectionId
            }
        });

        const result = await prisma.collectImg.deleteMany({
            where: {
                CollectImgId: collectionId
            }
        });

        return {
            data: result,
            message: "Success",
            status: "200"
        };
    } catch (e) {
        console.error(e);
        return {
            data: null,
            message: "Internal Server Error",
            status: "500"
        };
    }
}

export default apiHandler(handler);
