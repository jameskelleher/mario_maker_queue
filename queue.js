
// User defined class
// to store element and its priority
class QElement {
    constructor(username, isSubscriber, levelID)
    {
        this.username = username;
        this.isSubscriber = isSubscriber ? 1 : 0;
        this.levelID = levelID;
        this.time = Date.now();
    }

    toString() {
        var msg = `${this.username}: ${this.levelID}`;
        return msg;
    }

    updateLevelID(newLevelID) {
        this.levelID = newLevelID;
    }
}

// PriorityQueue class
class PriorityQueue {

    // An array is used to implement priority
    constructor()
    {
        this.items = [];
        this.formatRe = /^[a-zA-Z0-9]{3}-[a-zA-Z0-9]{3}-[a-zA-Z0-9]{3}$/
    }


    // enqueue function to add element
    // to the queue as per priority
    enqueue(username, isSubscriber, levelID)
    {
        // if no levelID provided
        if (levelID == undefined) {
          var msg = 'no level ID found, usage is "!mmq_add <LEVEL_ID>"';
          return msg;
        }

        // test formatting
        if (!this.formatRe.test(levelID)) {
          var msg = `${levelID} not properly formatted, please make sure the level ID has the form XXX-XXX-XXX`;
          return msg;
        }

        // coalesce to upper
        levelID = levelID.toUpperCase();

        // creating object from queue element
        var qElement = new QElement(username, isSubscriber, levelID);
        var contain = false;

        // iterating through the entire
        // item array to add element at the
        // correct location of the Queue
        for (var i = 0; i < this.items.length; i++) {
            var comp = this.items[i];

            // update user's levelID if user already in queue
            if (comp.username == qElement.username) {
                comp.updateLevelID(qElement.levelID);
                var msg = `Updated ${comp.username}'s level ID to ${comp.levelID}. You are at position ${i+1}`;
                return msg
            }

            if (comp.isSubscriber < qElement.isSubscriber) {
                this.items.splice(i, 0, qElement);
                contain = true;
                break;
            }

            if (comp.isSubscriber == qElement.isSubscriber && comp.time > qElement.time) {
                // Once the correct location is found it is
                // enqueued
                this.items.splice(i, 0, qElement);
                contain = true;
                break;
            }
        }

        // if the element have the highest priority
        // it is added at the end of the queue
        if (!contain) {
            this.items.push(qElement);
        }
        var msg = `${qElement.username} is at position ${i+1}`
        return msg;
    }


    // dequeue method to remove
    // element from the queue
    dequeue()
    {
        // return the dequeued element
        // and remove it.
        // if the queue is empty
        // returns Underflow
        if (this.isEmpty())
            return "queue is currently empty";
        var next = this.items.shift();
        return `Next up is ${next.toString()}`;
    }

    peek(num=5)
    {
        // look at the next levels in the Queue
        // without removing
        if (this.isEmpty())
            return "queue is currently empty";

        if (num == undefined) {
          num = 5;
        }

        num = num > 10 ? 10 : num;

        var msg = '';
        var n = num < this.items.length ? num : this.items.length;
        console.log(n);
        for (var i = 0; i < n; i++) {
            msg += `${i+1}) ${this.items[i].toString()} `;
        }
        return msg;
    }

    user_position(username) {
      if (this.isEmpty()) {
        return 'queue is currently empty';
      }

      for (var i = 0; i < this.items.length; i++) {
        if (this.items[i].username == username) {
          var msg = `At position ${i+1} - ${this.items[i].toString()}`
          return msg;
        }
      }

      var msg = `${username} not found in queue, use "!mmq_add <LEVEL_ID>" to add`;
      return msg;
    }

    clear() {
      if (this.isEmpty()) {
        return 'queue is already empty';
      }
      this.items = [];
      return 'queue cleared';
    }

    // isEmpty function
    isEmpty()
    {
        // return true if the queue is empty.
        return this.items.length == 0;
    }



}

module.exports = {
  QElement: QElement,
  PriorityQueue: PriorityQueue
}
