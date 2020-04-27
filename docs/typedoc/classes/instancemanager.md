[instance-manager](../README.md) › [InstanceManager](instancemanager.md)

# Class: InstanceManager <**I, O**>

## Type parameters

▪ **I**: *object*

▪ **O**

## Hierarchy

* **InstanceManager**

## Index

### Constructors

* [constructor](instancemanager.md#constructor)

### Properties

* [classToIdMap](instancemanager.md#classtoidmap)
* [classToIdToInstanceMap](instancemanager.md#classtoidtoinstancemap)
* [classToInstanceCounterMap](instancemanager.md#classtoinstancecountermap)
* [classToInstanceToIdMap](instancemanager.md#classtoinstancetoidmap)
* [classToOptionsMap](instancemanager.md#classtooptionsmap)
* [idToClassMap](instancemanager.md#idtoclassmap)

### Methods

* [addClass](instancemanager.md#addclass)
* [addInstance](instancemanager.md#addinstance)
* [getClassById](instancemanager.md#getclassbyid)
* [getClassId](instancemanager.md#getclassid)
* [getClassInstance](instancemanager.md#getclassinstance)
* [getClassOptions](instancemanager.md#getclassoptions)
* [getClassOptionsById](instancemanager.md#getclassoptionsbyid)
* [getInstanceId](instancemanager.md#getinstanceid)
* [removeClass](instancemanager.md#removeclass)
* [removeClassInstance](instancemanager.md#removeclassinstance)
* [removeInstance](instancemanager.md#removeinstance)
* [setClassById](instancemanager.md#setclassbyid)
* [setClassId](instancemanager.md#setclassid)
* [setClassInstance](instancemanager.md#setclassinstance)
* [setClassOptions](instancemanager.md#setclassoptions)
* [setClassOptionsById](instancemanager.md#setclassoptionsbyid)

## Constructors

###  constructor

\+ **new InstanceManager**(): *[InstanceManager](instancemanager.md)*

*Defined in [index.ts:55](https://github.com/JuroOravec/instance-manager/blob/e759c2d/src/index.ts#L55)*

**Returns:** *[InstanceManager](instancemanager.md)*

## Properties

###  classToIdMap

• **classToIdMap**: *[ClassToIdMap](../README.md#classtoidmap)‹I›* = new Map()

*Defined in [index.ts:46](https://github.com/JuroOravec/instance-manager/blob/e759c2d/src/index.ts#L46)*

___

###  classToIdToInstanceMap

• **classToIdToInstanceMap**: *[ClassToIdToInstanceMap](../README.md#classtoidtoinstancemap)‹I›* = new WeakMap()

*Defined in [index.ts:50](https://github.com/JuroOravec/instance-manager/blob/e759c2d/src/index.ts#L50)*

___

###  classToInstanceCounterMap

• **classToInstanceCounterMap**: *[ClassToInstCounterMap](../README.md#classtoinstcountermap)‹I›* = new WeakMap()

*Defined in [index.ts:55](https://github.com/JuroOravec/instance-manager/blob/e759c2d/src/index.ts#L55)*

___

###  classToInstanceToIdMap

• **classToInstanceToIdMap**: *[ClassToInstToIdMap](../README.md#classtoinsttoidmap)‹I›* = new WeakMap()

*Defined in [index.ts:53](https://github.com/JuroOravec/instance-manager/blob/e759c2d/src/index.ts#L53)*

___

###  classToOptionsMap

• **classToOptionsMap**: *[ClassToOptionsMap](../README.md#classtooptionsmap)‹I, O›* = new WeakMap()

*Defined in [index.ts:48](https://github.com/JuroOravec/instance-manager/blob/e759c2d/src/index.ts#L48)*

___

###  idToClassMap

• **idToClassMap**: *[IdToClassMap](../README.md#idtoclassmap)‹I›* = new Map()

*Defined in [index.ts:43](https://github.com/JuroOravec/instance-manager/blob/e759c2d/src/index.ts#L43)*

## Methods

###  addClass

▸ **addClass**(`klass`: [Class](../README.md#class)‹I›, `options?`: O): *any*

*Defined in [index.ts:149](https://github.com/JuroOravec/instance-manager/blob/e759c2d/src/index.ts#L149)*

**Parameters:**

Name | Type |
------ | ------ |
`klass` | [Class](../README.md#class)‹I› |
`options?` | O |

**Returns:** *any*

___

###  addInstance

▸ **addInstance**(`instance`: I): *void*

*Defined in [index.ts:177](https://github.com/JuroOravec/instance-manager/blob/e759c2d/src/index.ts#L177)*

**Parameters:**

Name | Type |
------ | ------ |
`instance` | I |

**Returns:** *void*

___

###  getClassById

▸ **getClassById**(`id`: number): *undefined | object*

*Defined in [index.ts:63](https://github.com/JuroOravec/instance-manager/blob/e759c2d/src/index.ts#L63)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | number |

**Returns:** *undefined | object*

___

###  getClassId

▸ **getClassId**(`klass`: [Class](../README.md#class)‹I›): *void*

*Defined in [index.ts:70](https://github.com/JuroOravec/instance-manager/blob/e759c2d/src/index.ts#L70)*

**Parameters:**

Name | Type |
------ | ------ |
`klass` | [Class](../README.md#class)‹I› |

**Returns:** *void*

___

###  getClassInstance

▸ **getClassInstance**(`klass`: [Class](../README.md#class)‹I›, `instanceId`: number): *undefined | I*

*Defined in [index.ts:100](https://github.com/JuroOravec/instance-manager/blob/e759c2d/src/index.ts#L100)*

**Parameters:**

Name | Type |
------ | ------ |
`klass` | [Class](../README.md#class)‹I› |
`instanceId` | number |

**Returns:** *undefined | I*

___

###  getClassOptions

▸ **getClassOptions**(`klass`: [Class](../README.md#class)‹I›): *undefined | object & O*

*Defined in [index.ts:77](https://github.com/JuroOravec/instance-manager/blob/e759c2d/src/index.ts#L77)*

**Parameters:**

Name | Type |
------ | ------ |
`klass` | [Class](../README.md#class)‹I› |

**Returns:** *undefined | object & O*

___

###  getClassOptionsById

▸ **getClassOptionsById**(`id`: number): *undefined | object & O*

*Defined in [index.ts:82](https://github.com/JuroOravec/instance-manager/blob/e759c2d/src/index.ts#L82)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | number |

**Returns:** *undefined | object & O*

___

###  getInstanceId

▸ **getInstanceId**(`instance`: I): *undefined | number*

*Defined in [index.ts:140](https://github.com/JuroOravec/instance-manager/blob/e759c2d/src/index.ts#L140)*

**Parameters:**

Name | Type |
------ | ------ |
`instance` | I |

**Returns:** *undefined | number*

___

###  removeClass

▸ **removeClass**(`klass`: [Class](../README.md#class)‹I›): *void*

*Defined in [index.ts:168](https://github.com/JuroOravec/instance-manager/blob/e759c2d/src/index.ts#L168)*

**Parameters:**

Name | Type |
------ | ------ |
`klass` | [Class](../README.md#class)‹I› |

**Returns:** *void*

___

###  removeClassInstance

▸ **removeClassInstance**(`instance`: I, `instanceId`: number): *void*

*Defined in [index.ts:122](https://github.com/JuroOravec/instance-manager/blob/e759c2d/src/index.ts#L122)*

**Parameters:**

Name | Type |
------ | ------ |
`instance` | I |
`instanceId` | number |

**Returns:** *void*

___

###  removeInstance

▸ **removeInstance**(`instance`: I): *undefined | true*

*Defined in [index.ts:192](https://github.com/JuroOravec/instance-manager/blob/e759c2d/src/index.ts#L192)*

**Parameters:**

Name | Type |
------ | ------ |
`instance` | I |

**Returns:** *undefined | true*

___

###  setClassById

▸ **setClassById**(`id`: number, `klass`: [Class](../README.md#class)‹I›): *Map‹number, object›*

*Defined in [index.ts:66](https://github.com/JuroOravec/instance-manager/blob/e759c2d/src/index.ts#L66)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | number |
`klass` | [Class](../README.md#class)‹I› |

**Returns:** *Map‹number, object›*

___

###  setClassId

▸ **setClassId**(`id`: number, `klass`: [Class](../README.md#class)‹I›): *void*

*Defined in [index.ts:73](https://github.com/JuroOravec/instance-manager/blob/e759c2d/src/index.ts#L73)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | number |
`klass` | [Class](../README.md#class)‹I› |

**Returns:** *void*

___

###  setClassInstance

▸ **setClassInstance**(`instance`: I, `instanceId`: number): *void*

*Defined in [index.ts:105](https://github.com/JuroOravec/instance-manager/blob/e759c2d/src/index.ts#L105)*

**Parameters:**

Name | Type |
------ | ------ |
`instance` | I |
`instanceId` | number |

**Returns:** *void*

___

###  setClassOptions

▸ **setClassOptions**(`klass`: [Class](../README.md#class)‹I›, `options`: O): *void*

*Defined in [index.ts:89](https://github.com/JuroOravec/instance-manager/blob/e759c2d/src/index.ts#L89)*

**Parameters:**

Name | Type |
------ | ------ |
`klass` | [Class](../README.md#class)‹I› |
`options` | O |

**Returns:** *void*

___

###  setClassOptionsById

▸ **setClassOptionsById**(`id`: number, `options`: O): *void*

*Defined in [index.ts:92](https://github.com/JuroOravec/instance-manager/blob/e759c2d/src/index.ts#L92)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | number |
`options` | O |

**Returns:** *void*
