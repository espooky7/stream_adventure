// It seems like poor form to be using the same names for functions in different scopes (queue and run) -
// a good way to lead to confusion

//There are no ; in this script

module.exports = Batch
 

function Batch(sync) {
  if(!(this instanceof Batch)) {
    return new Batch(sync)
  }
// needs ; 
  this.jobs = []
  this.sync = sync
  this.frame = null
  this.run = this.run.bind(this)
}
 
Batch.prototype.request_frame = request_frame
Batch.prototype.queue = queue
Batch.prototype.add = add
Batch.prototype.run = run
 
function add(fn) {
  var queued = false
    , batch = this //There seem to be some errors with this/self/batch. In line 36, self can't be
    , self          // set to this since it hasn't been passed into that function. I believe it should
    , arg           // be set to self = this
     
  return queue
  // this function returns before defining the queue and run functions
 
  function queue() {
    args = [].slice.call(arguments)
    self = this 
 
    if(!queued) {
      queued = true
      batch.queue(run) // should this not be batch.queue.run()?
    }
  }
 
  function run() {
    queued = false
    fn.apply(self, args)
  }
}
 
function queue(fn) {
  this.jobs.push(fn)
 
  if(!this.sync) {
    this.request_frame()
  }
}
 
function run() {
  var jobs = this.jobs
 
  this.jobs = []
  this.frame = null
 
  for(var i = 0, l = jobs.length; i < l; ++i) { // should be i++, not ++i
    jobs[i]()
  }
}
 
function request_frame() {
  if(this.frame) { // if a frame already exists, this function returns early and does nothing
    return
  }
  // otherwise get a new frame
  this.frame = requestAnimationFrame(this.run)
}
 
function requestAnimationFrame(callback) {
  var raf = global.requestAnimationFrame ||
    global.webkitRequestAnimationFrame ||
    global.mozRequestAnimationFrame ||
    timeout
 
  return raf(callback)
 
  function timeout(callback) {
    return setTimeout(callback, 1000 / 60)
  }
}