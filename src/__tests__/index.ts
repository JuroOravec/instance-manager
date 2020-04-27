import InstanceManager from '..';

describe('Instance Manager', () => {
  // Class factory that creates a class based on passed options
  const classFactory = (options: any) => {
    class MyClass {
      hello() {
        return options.message;
      }
    }
    return MyClass;
  };
  // A dynamic class
  const myClassOptions = { param: 42 };
  const MyDynamicClass = classFactory(myClassOptions);

  test('[meta] setup works', () => {
    expect(true).toBe(true);
  });

  test('initializes', () => {
    expect(new InstanceManager<any, any>()).toBeTruthy();
  });

  describe('class API - set', () => {
    let im: InstanceManager;

    beforeAll(() => {
      im = new InstanceManager();
    });

    test('addClass return class ID', () => {
      const arrayClassId = im.addClass(Array);
      expect(arrayClassId).toBeDefined();
      expect(typeof arrayClassId).toBe('number');
    });

    test('addClass accepts class options', () => {
      const myClassId = im.addClass(MyDynamicClass, myClassOptions);
      expect(myClassId).toBeDefined();
      expect(typeof myClassId).toBe('number');
    });
  });

  describe('class API - get', () => {
    let im: InstanceManager;
    const classIds: { [key: string]: number } = {};

    beforeAll(() => {
      im = new InstanceManager();
      classIds.array = im.addClass(Array) as number;
      classIds.myClass = im.addClass(MyDynamicClass, myClassOptions) as number;
    });

    test('get class by ID', () => {
      const ArrayClass = im.getClassById(classIds.array);
      expect(Object.is(Array, ArrayClass)).toBe(true);
    });

    test('get class ID', () => {
      const arrayClassId = im.getClassId(Array);
      expect(arrayClassId).toBe(classIds.array);
    });

    test('get class options', () => {
      const klassOptions = im.getClassOptions(MyDynamicClass);
      expect(klassOptions).toStrictEqual(myClassOptions);
    });

    test('get class options by ID', () => {
      const klassOptions = im.getClassOptionsById(classIds.myClass);
      expect(klassOptions).toStrictEqual(myClassOptions);
    });

    test('get class options by ID', () => {
      const klassOptions = im.getClassOptionsById(classIds.myClass);
      expect(klassOptions).toStrictEqual(myClassOptions);
    });
  });

  describe('class API - delete', () => {
    let im: InstanceManager;
    const classIds: { [key: string]: number } = {};

    beforeAll(() => {
      im = new InstanceManager();
      classIds.array = im.addClass(Array) as number;
    });

    test('remove class', () => {
      im.removeClass(Array);
      const arrayClassId = im.getClassId(Array);
      expect(arrayClassId).toBeUndefined();
    });
  });

  describe('instance API - set', () => {
    let im: InstanceManager;

    beforeAll(() => {
      im = new InstanceManager();
    });

    test('adding instance returns ID', () => {
      const instanceId = im.addInstance(new MyDynamicClass());
      expect(instanceId).toBeDefined();
      expect(typeof instanceId).toBe('number');
    });
  });

  describe('instance API - get', () => {
    let im: InstanceManager;
    const classIds: { [key: string]: number } = {};
    const instanceIds: { [key: string]: number } = {};

    beforeAll(() => {
      im = new InstanceManager();
      classIds.array = im.addClass(Array) as number;
      const arr = new Array(5);
      instanceIds.array = im.addInstance(arr);
    });

    test('get instance ID', () => {
      const klassInstance = new MyDynamicClass();
      const instanceId = im.addInstance(klassInstance);
      const sameId = im.getInstanceId(klassInstance);
      expect(instanceId).toBe(sameId);
    });

    test('registering instance registers class too if not registered', () => {
      const myNum = new Number('2');
      im.addInstance(myNum);
      const numKlassId = im.getClassId(Number);
      expect(numKlassId).toBeDefined();
      expect(typeof numKlassId).toBe('number');
    });

    test('get class instance', () => {
      // Get instance having class reference and knowing instance ID
      const instance = im.getClassInstance(Array, instanceIds.array);
      expect(instance).toBeDefined();
      expect(instance).toBeInstanceOf(Array);

      // Get instance knowing only class ID and instance ID
      const klass = im.getClassById(classIds.array);
      const instance2 = im.getClassInstance(klass!, instanceIds.array);
      expect(instance2).toBeDefined();
      expect(instance2).toBeInstanceOf(Array);
    });
  });

  describe('instance API - remove', () => {
    const prepareIM = () => {
      const im = new InstanceManager();
      const klass = Array;
      const instance = new klass(5);
      return {
        instanceManager: im,
        class: klass,
        instance,
        classId: im.addClass(klass) as number,
        instanceId: im.addInstance(instance),
      };
    };

    test('remove instance by id', () => {
      const {
        instanceManager,
        class: klass,
        instance,
        instanceId,
      } = prepareIM();
      instanceManager.removeClassInstance(klass, instanceId);
      const id = instanceManager.getInstanceId(instance);
      expect(id).toBeUndefined();
    });

    test('remove instance by reference', () => {
      const { instanceManager, instance, instanceId } = prepareIM();
      instanceManager.removeInstance(instance);
      const id = instanceManager.getInstanceId(instance);
      expect(id).not.toBe(instanceId);
      expect(id).toBeUndefined();
    });
  });
});
