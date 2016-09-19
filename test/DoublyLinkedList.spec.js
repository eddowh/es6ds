import LinkedList from '../src/DoublyLinkedList.js';
import {IndexError} from '../src/exceptions.js';
import test, {assert} from 'unit.js';
import {suite, setup, test as suitetest} from 'mocha';

suite('Doubly Linked List', () => {
  // "setup" function
  let ll = new LinkedList();
  for (let i = 0; i < 10; i++) {
    ll.pushback(i+1);
  }

  suite('pushback', () => {
    suitetest('nominal', () => {

    });
  });

  suite('pushback', () => {
    suitetest('nominal', () => {

    });
  });

  suite('insert', () => {
    suitetest('nominal', () => {

    });
  });

  suite('remove', () => {
    suitetest('nominal', () => {

    });
  });

  suite('get', () => {
    suitetest('nominal', () => {
      let list = new LinkedList();
      let func = (i) => { return (i+1) * 10 };
      for (let i = 0; i < 10; i++) {
        list.pushback(func(i));
      }
      for (let i = 0; i < 10; i++) {
        assert.equal(list.get(i), func(i));
      };
    });

    suitetest('out of bounds', () => {
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
        list.pushback(i);
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

    suitetest('out of bounds', () => {
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
      shortList.pushback(1234567890);

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
