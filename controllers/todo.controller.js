
const helpers = require('../helpers/todo.helper')


exports.addList = async (req, res) => {
  let result = await helpers.insert(req.body.taskName, req.body.taskDescription)
  if (result.status) {
    return res.status(200).json({
      message: "success",
      data: result.data
    });
  }
  else {
    return res.status(500).json({
      message: "Internal Error",
      error: result.data
    });
  }
}

exports.updateList = async (req, res) => {
  let result = await helpers.update(req.body._id, req.body.taskName, req.body.taskDescription)
  if (result.status) {
    console.log(result.data)
    if (result.data != null) {
      return res.status(200).json({
        message: "Success",
        data: result.data
      });
    }
    return res.status(404).json({
      message: "No such Task"
    });

  }
  return res.status(500).json({
    message: "Internal Error",
    error: result.data
  });
}

exports.delete = async (req, res) => {
  let result = await helpers.delete(req.body._id)
  if (result.status) {
    if (result.data != null) {
      return res.status(200).json({
        message: "success"
      });
    }
    return res.status(404).json({
      message: "No such Task"
    });

  }
  return res.status(500).json({
    message: "Internal Error",
    error: result.data
  });
}

exports.getAllTasks = async (req, res) => {
  let result = await helpers.list()
  if (result.status) {
    return res.status(200).json({
      message: "success",
      data: result.data
    })
  }
  return res.status(500).json({
    message: "Internal Error",
    error: result.data
  })
}

exports.getRecord = async (req, res) => {
  let result = await helpers.getRecord(req.query._id)
  if (result.status) {
    return res.status(200).json({
      message: "success",
      data: result.data
    })
  }
  return res.status(500).json({
    message: "Internal Error",
    error: result.data
  })
}


