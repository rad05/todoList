const Task = require('../models/todo.model')

exports.insert = async function create(taskName, taskDescription) {
    try {
        let task = new Task({
            taskName: taskName,
            taskDescription: taskDescription
        });
        let doc = await task.save();
        return { "status": 1, "data": doc };
    } catch (error) {
        return { "status": 0, "data": error };
    }
}

exports.update = async function update(_id, taskName, taskDescription) {
    try {
        const filter = { _id: _id };
        const update = {  taskName: taskName , taskDescription: taskDescription};
        let doc = await Task.findOneAndUpdate(filter, update, {
            new: true
        });
        if (doc == null) {
            return { "status": 1, "data": null };
        }
        else {
            return { "status": 1, "data": doc };
        }
    }
    catch (error) {
        return { "status": 0, "data": error };
    }
}

exports.delete = async function remove(_id) {
    try {
        let count = await Task.count({ _id: _id })
        if (count) {
            let doc = await Task.findOneAndDelete({ _id })
            return { "status": 1, "data": "success" };
        }
        return { "status": 1, "data": null };
    }
    catch (error) {
        return { "status": 0, "data": error };
    }
}

exports.list = async function list() {
    try {
        let tasks = await Task.find({});
        return { "status": 1, "data": tasks }
    }
    catch (error) {
        return { "status": 0, "data": error };
    }
}

exports.getRecord = async function getRecord(_id) {
    try {
        let task = await Task.findOne({ _id: _id });
        return { "status": 1, data: task }
    }
    catch (error) {
        return { "status": 0, "data": error };
    }
}