
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
}

// PriorityQueue class
class PriorityQueue {

    // An array is used to implement priority
    constructor()
    {
        this.items = [];
    }


    // enqueue function to add element
    // to the queue as per priority
    enqueue(username, isSubscriber, levelID)
    {
        if (levelID == undefined) {
          var msg = 'no level ID found, usage is "!mmq_add <LEVEL_ID>"';
          return msg;
        }
        // creating object from queue element
        var qElement = new QElement(username, isSubscriber, levelID);
        var contain = false;

        // iterating through the entire
        // item array to add element at the
        // correct location of the Queue
        for (var i = 0; i < this.items.length; i++) {
            var comp = this.items[i];

            // if (comp.username == qElement.username) {
            //   var msg = `${qElement.username} is already in the queue at position ${i+1}`;
            //   return msg;
            // }
            if (comp.isSubscriber < qElement.isSubscriber) {
                this.items.splice(i, 0, qElement);
                contain = true;
                break;
            };
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
