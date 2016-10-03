import LinkedList from '../src/DoublyLinkedList.js';
import {IndexError} from '../src/exceptions.js';
import test, {assert} from 'unit.js';
import {suite, setup, test as suitetest} from 'mocha';

suite('Doubly Linked List', () => {
  // "setup" function
  let ll = new LinkedList();
  for (let i = 0; i < 10; i++) {
    ll.push(i+1);
  }

  /**
   * shift() and push() is tested by testing insert
   */
  suite('insert', () => {
    suitetest('nominal', () => {
      let list = new LinkedList();
      list.insert(0, "a");
      assert.equal(list.size, 1);
      assert.equal(list.get(0), "a");
      list.insert(0, "b");
      assert.equal(list.size, 2);
      assert.equal(list.get(0), "b");
      assert.equal(list.get(1), "a");
      assert.equal(list.get(list.size-1), "a");
      list.insert(1, "c");
      assert.equal(list.get(1), "c");
      list.insert(list.size, "d");
      assert.equal(list.size, 4);
      assert.equal(list.get(list.size-1), "d");
    });

    suitetest('boundary', () => {
      let list = new LinkedList();
      assert.throws(
        () => { list.insert(-1, "XXX"); },
        Error
      );
      assert.throws(
        () => { list.insert(list.size+1, "XXX"); },
        Error
      );
      assert.throws(
        () => { list.insert(9999, "XXX"); },
        Error
      );
    });
  });

  /**
   * unshift() and pop() is tested by testing remove()
   */
  suite('remove', () => {
    suitetest('nominal', () => {
      let list = ll.clone();
      list.remove(2);
      assert.equal(list.size, 9);
      // make sure the list does not contain 3 (which was just removed)
      test.bool(ll.contains(3)).isTrue();
      list.remove(0);
      assert.equal(list.size, 8);
      test.bool(ll.contains(1)).isTrue();
      assert.equal(list.get(0), 2);
      list.remove(list.size-1);
      assert.equal(list.size, 7);
      test.bool(ll.contains(10)).isTrue();
      assert.equal(list.get(list.size-1), 9);
    });

    suitetest('boundary', () => {
      let list = ll.clone();
      assert.throws(
        () => { list.remove(-1); },
        Error
      );
      assert.throws(
        () => { list.remove(list.size); },
        Error
      );
      assert.throws(
        () => { list.remove(999); },
        Error
      );
    });
  });

  suite('get', () => {
    suitetest('nominal', () => {
      let list = new LinkedList();
      let func = (i) => { return (i+1) * 10 };
      for (let i = 0; i < 10; i++) {
        list.push(func(i));
      }
      for (let i = 0; i < 10; i++) {
        assert.equal(list.get(i), func(i));
      };
    });

    suitetest('boundary', () => {
      assert.throws(
        () => { ll.get(-1); },
        Error
      );
      assert.throws(
        () => { ll.get(ll.size); },
        Error
      );
    });
  });

  suite('set', () => {
    suitetest('nominal', () => {
      let list = new LinkedList();
      let func = (i) => { return (i+1) * 10 };
      for (let i = 0; i < 10; i++) {
        list.push(i);
        list.set(i, func(i));
      }
      for (let i = 0; i < 10; i++) {
        assert.equal(list.get(i), func(i));
      }

      const idx = 5;
      const newValue = 99;
      // ensure uniqueness before testing
      for (let head = list.head; head != null; head = head.next) {
        if (head.value == newValue) {
          throw new Error("New value must be unique in the list to guarantee `get` corresponds to the correct index.");
        }
      };
      const originalValue = list.get(idx);
      list.set(idx, newValue);
      assert.notEqual(originalValue, newValue);
      assert.notEqual(list.get(idx), originalValue);
      assert.equal(list.get(idx), newValue);
    });

    suitetest('boundary', () => {
      assert.throws(
        () => { ll.get(-1); },
        Error
      );
      assert.throws(
        () => { ll.get(ll.size); },
        Error
      );
    });
  });

  suite('contains', () => {
    suitetest('nominal', () => {
      for (let i = 0; i < 10; i++) {
        test.bool(ll.contains(i+1)).isTrue();
      }
    });
  });

  suite('equals', () => {
    suitetest('should be equal to itself', () => {
      assert.equal(ll, ll);
      test.bool(ll.equals(ll)).isTrue();
    });

    suitetest('should be equal to, but not is, clone', () => {
      assert.notEqual(ll, ll.clone());
      test.bool(ll.equals(ll.clone())).isTrue();
    });

    suitetest('lists of different length should not be equal', () => {
      let shortList = new LinkedList();
      shortList.push(1234567890);

      assert.notEqual(ll, shortList);
      test.bool(ll.equals(shortList)).isFalse();
    });
  });

  suite('clone', () => {
    suitetest('retain size', () => {
      let clonedList = ll.clone();
      assert.equal(clonedList.size, ll.size);
    });

    suitetest('should not modify original list', () => {
      let clonedList = ll.clone();
      test.bool(ll.equals(clonedList)).isTrue();
      const idx = ll.size-1;
      const originalValue = ll.get(idx);
      const newValue = 33;
      assert.notEqual(newValue, originalValue);
      clonedList.set(idx, newValue);
      assert.equal(ll.size, clonedList.size);
      test.bool(ll.equals(clonedList)).isFalse();
      assert.equal(ll.get(idx), originalValue);
      assert.equal(clonedList.get(idx), newValue);
      assert.notEqual(clonedList.get(idx), ll.get(idx));
    });
  });
});
