type Constructor<T> = new (...agrs: any[]) => T;
type Class<T> = Constructor<T>;
type IdToClassMap<T> = Map<number, Class<T>>;
type ClassToIdMap<T> = Map<Class<T>, number>;
type ClassToOptionsMap<T, O> = WeakMap<Class<T>, O>;
type IdToInstanceMap<T> = Map<number, T>;
type ClassToIdToInstanceMap<T> = WeakMap<Class<T>, IdToInstanceMap<T>>;
type InstanceToIdMap<T extends object> = WeakMap<T, number>;
type ClassToInstToIdMap<T extends object> = WeakMap<Class<T>, InstanceToIdMap<T>>;
type ClassToInstCounterMap<T> = WeakMap<Class<T>, () => number>;

/**
 * @hidden
 */
type ManagerCounterMap = WeakMap<InstanceManager<any, any>, (c?: any) => number>;

/**
 * Map for storing counters for individual instances of manager
 * @hidden
 */
const managerCounterMap: ManagerCounterMap = new WeakMap();

/**
 * @hidden
 */
const classCounter = <T extends InstanceManager<any, any>>(instance: T) => {
  const counter = managerCounterMap.get(instance) || ((x?: any) => x as number);
  return counter();
};

class InstanceManager<I extends {}, O> {
  // Maps that store the state of registered classes and instances

  // {classId -> class}
  idToClassMap: IdToClassMap<I> = new Map();
  // {class -> classId}
  // Convenience for adding new classes
  classToIdMap: ClassToIdMap<I> = new Map();
  // {class -> options}
  classToOptionsMap: ClassToOptionsMap<I, O> = new WeakMap();
  // {class -> {instanceId -> instance}}
  classToIdToInstanceMap: ClassToIdToInstanceMap<I> = new WeakMap();
  // {class -> {instance -> instanceId}}
  // Convenience for adding new instances
  classToInstanceToIdMap: ClassToInstToIdMap<I> = new WeakMap();
  // {class -> counter }
  classToInstanceCounterMap: ClassToInstCounterMap<I> = new WeakMap();

  constructor() {
    managerCounterMap.set(this, createCounter());
  }

  // Lower level API

  getClassById(id: number) {
    return this.idToClassMap.get(id);
  }
  setClassById(id: number, klass: Class<I>) {
    return this.idToClassMap.set(id, klass);
  }

  getClassId(klass: Class<I>) {
    this.classToIdMap.get(klass);
  }
  setClassId(id: number, klass: Class<I>) {
    this.classToIdMap.set(klass, id);
  }

  getClassOptions(klass: Class<I>) {
    const klassOptions = this.classToOptionsMap.get(klass);
    if (!klassOptions) return;
    return Object.assign({}, klassOptions);
  }
  getClassOptionsById(id: number) {
    const klass = this.getClassById(id);
    if (!klass) {
      throw Error(`Cannot find a class by ID ${id}`);
    }
    return this.getClassOptions(klass);
  }
  setClassOptions(klass: Class<I>, options: O) {
    this.classToOptionsMap.set(klass, options);
  }
  setClassOptionsById(id: number, options: O) {
    const klass = this.getClassById(id);
    if (!klass) {
      throw Error(`Cannot find a class by ID ${id}`);
    }
    this.classToOptionsMap.set(klass, options);
  }

  getClassInstance(klass: Class<I>, instanceId: number) {
    const instanceMap = this.classToIdToInstanceMap.get(klass);
    if (!instanceMap) return;
    return instanceMap.get(instanceId);
  }
  setClassInstance(instance: I, instanceId: number) {
    const klass = instance.constructor as Class<I>;

    // set {class -> {instanceId -> instance}}
    const instanceMap = this.classToIdToInstanceMap.get(klass);
    if (!instanceMap) {
      throw Error(`No id->instance map found for class ${klass}`);
    }
    instanceMap.set(instanceId, instance);

    // set {class -> {instance -> instanceId}}
    const instanceIdMap = this.classToInstanceToIdMap.get(klass);
    if (!instanceIdMap) {
      throw Error(`No instance->id map found for class ${klass}`);
    }
    instanceIdMap.set(instance, instanceId);
  }
  removeClassInstance(instance: I, instanceId: number) {
    const klass = instance.constructor as Class<I>;

    // remove inner map of {class -> {instanceId -> instance}}
    const instanceMap = this.classToIdToInstanceMap.get(klass);
    if (!instanceMap) {
      throw Error(`No id->instance map found for class ${klass}`);
    }
    instanceMap.delete(instanceId);

    // remove inner map of {class -> {instance -> instanceId}}
    const instanceIdMap = this.classToInstanceToIdMap.get(klass);
    if (!instanceIdMap) {
      throw Error(`No instance->id map found for class ${klass}`);
    }
    instanceIdMap.delete(instance);
  }

  getInstanceId(instance: I) {
    const klass = instance.constructor as Class<I>;
    const instanceIdMap = this.classToInstanceToIdMap.get(klass);
    if (!instanceIdMap) return;
    return instanceIdMap.get(instance);
  }

  // Higher API

  addClass(klass: Class<I>, options?: O) {
    if (this.classToIdMap.get(klass) !== undefined) {
      return; // class already registered
    }
    const id = classCounter(this);
    this.setClassById(id, klass);
    this.setClassId(id, klass);
    if (options !== undefined) {
      this.setClassOptions(klass, options);
    }
    this._createClassInstanceMaps(klass);
    return id;
  }

  // Note that this function only removes the class from the maps.
  // It does not delete the class nor its instances.
  removeClass(klass: Class<I>) {
    const klassId = this.classToIdMap.get(klass) as number;
    this._removeClassInstanceMaps(klass);
    this.classToOptionsMap.delete(klass);
    this.idToClassMap.delete(klassId);
    this.classToIdMap.delete(klass);
  }

  addInstance(instance: I) {
    const klass = instance.constructor as Class<I>;
    let klassId = this.classToIdMap.get(klass);
    if (klassId === undefined) {
      klassId = this.addClass(klass);
    }
    const instanceIdCounter = this.classToInstanceCounterMap.get(klass) as () => number;
    const instanceId = instanceIdCounter();
    this.setClassInstance(instance, instanceId);
  }

  removeInstance(instance: I) {
    const id = this.getInstanceId(instance);
    if (!id) return;
    this.removeClassInstance(instance, id);
    return true;
  }

  // Helpers

  /**
   * @hidden
   */
  _createClassInstanceMaps(klass: Class<I>) {
    // create {class -> {instanceId -> instance}}
    let instanceMap = this.classToIdToInstanceMap.get(klass);
    if (!instanceMap) {
      instanceMap = new Map();
      this.classToIdToInstanceMap.set(klass, instanceMap);
    }

    // create {class -> {instance -> instanceId}}
    let instanceIdMap = this.classToInstanceToIdMap.get(klass);
    if (!instanceIdMap) {
      instanceIdMap = new WeakMap();
      this.classToInstanceToIdMap.set(klass, instanceIdMap);
    }

    // {class -> counter}
    let counter = this.classToInstanceCounterMap.get(klass);
    if (!counter) {
      counter = createCounter();
      this.classToInstanceCounterMap.set(klass, counter);
    }
  }

  /**
   * @hidden
   */
  _removeClassInstanceMaps(klass: Class<I>) {
    this.classToIdToInstanceMap.delete(klass);
    this.classToInstanceToIdMap.delete(klass);
    this.classToInstanceCounterMap.delete(klass);
  }
}

// Helpers

/**
 * @hidden
 */
function createCounter(incrementor: (c: number) => number = (c) => c + 1) {
  let count = 0;
  return () => {
    count = incrementor(count);
    return count;
  };
}

export default InstanceManager;
