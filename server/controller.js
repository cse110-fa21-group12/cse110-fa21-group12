'use strict';

const firebase = require('../db');
const User = require('../models/user');
const firestore = firebase.firstore();

const registerUser = async (req, res, next) => {
	try {
		const data = req.body;
		await firestore.collection('users').doc().set(data);
		res.send('User registered successfully');
	}
	catch (error) {
		res.status(400).send(error.message);
	}
}

const getAllUsers = async (req, res, next) => {
	try {
		const users = await firestore.collection('users');
		const data = await users.get();
		const usersArray = [];
		if (data.empty) {
			res.status(404).send('No user record found');
		}
		else {
			data.forEach(doc => {
				const user = new User(
					doc.id, 
					doc.data().EMAIL
				);
				usersArray.push(user);
			});
			res.send(usersArray);
		}
	}
	catch (error) {
		res.status(400).send(error.message);
	}
}

const getUser = async (req, res, next) => {
	try {
		const id = req.params.id;
		const user = await firestore.collection('users').doc(id);
		const data = await student.get();
		if (!data.exists) {
			res.status(404).send('User with the given ID not found');
		}
		else {
			res.send(data.data());
		}
	}
	catch (error) {
		res.status(400).send(error.message);
	}
}

const updateUser = async (req, res, next) => {
	try {
		const id = req.params.id;
		const data = req.body;
		const user = await firestore.collection('users').doc(id);
		await student.update(data);
		res.send('User record updated successfully');
	}
	catch (error) {
		res.status(400).send(error.message);
	}
}

const deleteUser = async (req, res, next) => {
	try {
		const id = req.params.id;
		await firestore.collection('users').doc(id).delete();
		res.send('User record deleted successfully');
	}
	catch (error) {
		res.status(400).send(error.message);
	}
}

module.exports = {
	registerUser, 
	getAllUsers, 
	getUser, 
	updateUser, 
	deleteUser
}