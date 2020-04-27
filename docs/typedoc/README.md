[instance-manager](README.md)

# instance-manager

## Index

### Classes

* [InstanceManager](classes/instancemanager.md)

### Type aliases

* [Class](README.md#class)
* [ClassToIdMap](README.md#classtoidmap)
* [ClassToIdToInstanceMap](README.md#classtoidtoinstancemap)
* [ClassToInstCounterMap](README.md#classtoinstcountermap)
* [ClassToInstToIdMap](README.md#classtoinsttoidmap)
* [ClassToOptionsMap](README.md#classtooptionsmap)
* [Constructor](README.md#constructor)
* [IdToClassMap](README.md#idtoclassmap)
* [IdToInstanceMap](README.md#idtoinstancemap)
* [InstanceToIdMap](README.md#instancetoidmap)

### Variables

* [mainDebug](README.md#const-maindebug)

### Functions

* [getDebugLogger](README.md#getdebuglogger)

## Type aliases

###  Class

Ƭ **Class**: *[Constructor](README.md#constructor)‹T›*

*Defined in [index.ts:4](https://github.com/JuroOravec/instance-manager/blob/e759c2d/src/index.ts#L4)*

___

###  ClassToIdMap

Ƭ **ClassToIdMap**: *Map‹[Class](README.md#class)‹T›, number›*

*Defined in [index.ts:6](https://github.com/JuroOravec/instance-manager/blob/e759c2d/src/index.ts#L6)*

___

###  ClassToIdToInstanceMap

Ƭ **ClassToIdToInstanceMap**: *WeakMap‹[Class](README.md#class)‹T›, [IdToInstanceMap](README.md#idtoinstancemap)‹T››*

*Defined in [index.ts:9](https://github.com/JuroOravec/instance-manager/blob/e759c2d/src/index.ts#L9)*

___

###  ClassToInstCounterMap

Ƭ **ClassToInstCounterMap**: *WeakMap‹[Class](README.md#class)‹T›, function›*

*Defined in [index.ts:15](https://github.com/JuroOravec/instance-manager/blob/e759c2d/src/index.ts#L15)*

___

###  ClassToInstToIdMap

Ƭ **ClassToInstToIdMap**: *WeakMap‹[Class](README.md#class)‹T›, [InstanceToIdMap](README.md#instancetoidmap)‹T››*

*Defined in [index.ts:11](https://github.com/JuroOravec/instance-manager/blob/e759c2d/src/index.ts#L11)*

___

###  ClassToOptionsMap

Ƭ **ClassToOptionsMap**: *WeakMap‹[Class](README.md#class)‹T›, O›*

*Defined in [index.ts:7](https://github.com/JuroOravec/instance-manager/blob/e759c2d/src/index.ts#L7)*

___

###  Constructor

Ƭ **Constructor**: *object*

*Defined in [index.ts:3](https://github.com/JuroOravec/instance-manager/blob/e759c2d/src/index.ts#L3)*

#### Type declaration:

___

###  IdToClassMap

Ƭ **IdToClassMap**: *Map‹number, [Class](README.md#class)‹T››*

*Defined in [index.ts:5](https://github.com/JuroOravec/instance-manager/blob/e759c2d/src/index.ts#L5)*

___

###  IdToInstanceMap

Ƭ **IdToInstanceMap**: *Map‹number, T›*

*Defined in [index.ts:8](https://github.com/JuroOravec/instance-manager/blob/e759c2d/src/index.ts#L8)*

___

###  InstanceToIdMap

Ƭ **InstanceToIdMap**: *WeakMap‹T, number›*

*Defined in [index.ts:10](https://github.com/JuroOravec/instance-manager/blob/e759c2d/src/index.ts#L10)*

## Variables

### `Const` mainDebug

• **mainDebug**: *log* = getDebugLogger()

*Defined in [lib/debug.ts:15](https://github.com/JuroOravec/instance-manager/blob/e759c2d/src/lib/debug.ts#L15)*

## Functions

###  getDebugLogger

▸ **getDebugLogger**(): *log*

*Defined in [lib/debug.ts:4](https://github.com/JuroOravec/instance-manager/blob/e759c2d/src/lib/debug.ts#L4)*

**Returns:** *log*
