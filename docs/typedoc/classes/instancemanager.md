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

*Defined in [index.ts:47](https://github.com/JuroOravec/instance-manager/blob/72b6b82/src/index.ts#L47)*

**Returns:** *[InstanceManager](instancemanager.md)*

## Properties

###  classToIdMap

• **classToIdMap**: *[ClassToIdMap](../README.md#classtoidmap)‹I›* = new Map()

*Defined in [index.ts:38](https://github.com/JuroOravec/instance-manager/blob/72b6b82/src/index.ts#L38)*

___

###  classToIdToInstanceMap

• **classToIdToInstanceMap**: *[ClassToIdToInstanceMap](../README.md#classtoidtoinstancemap)‹I›* = new WeakMap()

*Defined in [index.ts:42](https://github.com/JuroOravec/instance-manager/blob/72b6b82/src/index.ts#L42)*

___

###  classToInstanceCounterMap

• **classToInstanceCounterMap**: *[ClassToInstCounterMap](../README.md#classtoinstcountermap)‹I›* = new WeakMap()

*Defined in [index.ts:47](https://github.com/JuroOravec/instance-manager/blob/72b6b82/src/index.ts#L47)*

___

###  classToInstanceToIdMap

• **classToInstanceToIdMap**: *[ClassToInstToIdMap](../README.md#classtoinsttoidmap)‹I›* = new WeakMap()

*Defined in [index.ts:45](https://github.com/JuroOravec/instance-manager/blob/72b6b82/src/index.ts#L45)*

___

###  classToOptionsMap

• **classToOptionsMap**: *[ClassToOptionsMap](../README.md#classtooptionsmap)‹I, O›* = new WeakMap()

*Defined in [index.ts:40](https://github.com/JuroOravec/instance-manager/blob/72b6b82/src/index.ts#L40)*

___

###  idToClassMap

• **idToClassMap**: *[IdToClassMap](../README.md#idtoclassmap)‹I›* = new Map()

*Defined in [index.ts:35](https://github.com/JuroOravec/instance-manager/blob/72b6b82/src/index.ts#L35)*

## Methods

###  addClass

▸ **addClass**(`klass`: [Class](../README.md#class)‹I›, `options?`: O): *any*

*Defined in [index.ts:141](https://github.com/JuroOravec/instance-manager/blob/72b6b82/src/index.ts#L141)*

**Parameters:**

Name | Type |
------ | ------ |
`klass` | [Class](../README.md#class)‹I› |
`options?` | O |

**Returns:** *any*

___

###  addInstance

▸ **addInstance**(`instance`: I): *void*

*Defined in [index.ts:165](https://github.com/JuroOravec/instance-manager/blob/72b6b82/src/index.ts#L165)*

**Parameters:**

Name | Type |
------ | ------ |
`instance` | I |

**Returns:** *void*

___

###  getClassById

▸ **getClassById**(`id`: number): *undefined | object*

*Defined in [index.ts:55](https://github.com/JuroOravec/instance-manager/blob/72b6b82/src/index.ts#L55)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | number |

**Returns:** *undefined | object*

___

###  getClassId

▸ **getClassId**(`klass`: [Class](../README.md#class)‹I›): *void*

*Defined in [index.ts:62](https://github.com/JuroOravec/instance-manager/blob/72b6b82/src/index.ts#L62)*

**Parameters:**

Name | Type |
------ | ------ |
`klass` | [Class](../README.md#class)‹I› |

**Returns:** *void*

___

###  getClassInstance

▸ **getClassInstance**(`klass`: [Class](../README.md#class)‹I›, `instanceId`: number): *undefined | I*

*Defined in [index.ts:92](https://github.com/JuroOravec/instance-manager/blob/72b6b82/src/index.ts#L92)*

**Parameters:**

Name | Type |
------ | ------ |
`klass` | [Class](../README.md#class)‹I› |
`instanceId` | number |

**Returns:** *undefined | I*

___

###  getClassOptions

▸ **getClassOptions**(`klass`: [Class](../README.md#class)‹I›): *undefined | object & O*

*Defined in [index.ts:69](https://github.com/JuroOravec/instance-manager/blob/72b6b82/src/index.ts#L69)*

**Parameters:**

Name | Type |
------ | ------ |
`klass` | [Class](../README.md#class)‹I› |

**Returns:** *undefined | object & O*

___

###  getClassOptionsById

▸ **getClassOptionsById**(`id`: number): *undefined | object & O*

*Defined in [index.ts:74](https://github.com/JuroOravec/instance-manager/blob/72b6b82/src/index.ts#L74)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | number |

**Returns:** *undefined | object & O*

___

###  getInstanceId

▸ **getInstanceId**(`instance`: I): *undefined | number*

*Defined in [index.ts:132](https://github.com/JuroOravec/instance-manager/blob/72b6b82/src/index.ts#L132)*

**Parameters:**

Name | Type |
------ | ------ |
`instance` | I |

**Returns:** *undefined | number*

___

###  removeClass

▸ **removeClass**(`klass`: [Class](../README.md#class)‹I›): *void*

*Defined in [index.ts:157](https://github.com/JuroOravec/instance-manager/blob/72b6b82/src/index.ts#L157)*

**Parameters:**

Name | Type |
------ | ------ |
`klass` | [Class](../README.md#class)‹I› |

**Returns:** *void*

___

###  removeClassInstance

▸ **removeClassInstance**(`instance`: I, `instanceId`: number): *void*

*Defined in [index.ts:114](https://github.com/JuroOravec/instance-manager/blob/72b6b82/src/index.ts#L114)*

**Parameters:**

Name | Type |
------ | ------ |
`instance` | I |
`instanceId` | number |

**Returns:** *void*

___

###  removeInstance

▸ **removeInstance**(`instance`: I): *undefined | true*

*Defined in [index.ts:176](https://github.com/JuroOravec/instance-manager/blob/72b6b82/src/index.ts#L176)*

**Parameters:**

Name | Type |
------ | ------ |
`instance` | I |

**Returns:** *undefined | true*

___

###  setClassById

▸ **setClassById**(`id`: number, `klass`: [Class](../README.md#class)‹I›): *Map‹number, object›*

*Defined in [index.ts:58](https://github.com/JuroOravec/instance-manager/blob/72b6b82/src/index.ts#L58)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | number |
`klass` | [Class](../README.md#class)‹I› |

**Returns:** *Map‹number, object›*

___

###  setClassId

▸ **setClassId**(`id`: number, `klass`: [Class](../README.md#class)‹I›): *void*

*Defined in [index.ts:65](https://github.com/JuroOravec/instance-manager/blob/72b6b82/src/index.ts#L65)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | number |
`klass` | [Class](../README.md#class)‹I› |

**Returns:** *void*

___

###  setClassInstance

▸ **setClassInstance**(`instance`: I, `instanceId`: number): *void*

*Defined in [index.ts:97](https://github.com/JuroOravec/instance-manager/blob/72b6b82/src/index.ts#L97)*

**Parameters:**

Name | Type |
------ | ------ |
`instance` | I |
`instanceId` | number |

**Returns:** *void*

___

###  setClassOptions

▸ **setClassOptions**(`klass`: [Class](../README.md#class)‹I›, `options`: O): *void*

*Defined in [index.ts:81](https://github.com/JuroOravec/instance-manager/blob/72b6b82/src/index.ts#L81)*

**Parameters:**

Name | Type |
------ | ------ |
`klass` | [Class](../README.md#class)‹I› |
`options` | O |

**Returns:** *void*

___

###  setClassOptionsById

▸ **setClassOptionsById**(`id`: number, `options`: O): *void*

*Defined in [index.ts:84](https://github.com/JuroOravec/instance-manager/blob/72b6b82/src/index.ts#L84)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | number |
`options` | O |

**Returns:** *void*
