<?php

namespace ContainerKru7I0W;
include_once \dirname(__DIR__, 4).'/vendor/doctrine/persistence/lib/Doctrine/Persistence/ObjectManager.php';
include_once \dirname(__DIR__, 4).'/vendor/doctrine/orm/lib/Doctrine/ORM/EntityManagerInterface.php';
include_once \dirname(__DIR__, 4).'/vendor/doctrine/orm/lib/Doctrine/ORM/EntityManager.php';

class EntityManager_9a5be93 extends \Doctrine\ORM\EntityManager implements \ProxyManager\Proxy\VirtualProxyInterface
{
    /**
     * @var \Doctrine\ORM\EntityManager|null wrapped object, if the proxy is initialized
     */
    private $valueHolder213c9 = null;

    /**
     * @var \Closure|null initializer responsible for generating the wrapped object
     */
    private $initializer47dde = null;

    /**
     * @var bool[] map of public properties of the parent class
     */
    private static $publicPropertiesa0b5d = [
        
    ];

    public function getConnection()
    {
        $this->initializer47dde && ($this->initializer47dde->__invoke($valueHolder213c9, $this, 'getConnection', array(), $this->initializer47dde) || 1) && $this->valueHolder213c9 = $valueHolder213c9;

        return $this->valueHolder213c9->getConnection();
    }

    public function getMetadataFactory()
    {
        $this->initializer47dde && ($this->initializer47dde->__invoke($valueHolder213c9, $this, 'getMetadataFactory', array(), $this->initializer47dde) || 1) && $this->valueHolder213c9 = $valueHolder213c9;

        return $this->valueHolder213c9->getMetadataFactory();
    }

    public function getExpressionBuilder()
    {
        $this->initializer47dde && ($this->initializer47dde->__invoke($valueHolder213c9, $this, 'getExpressionBuilder', array(), $this->initializer47dde) || 1) && $this->valueHolder213c9 = $valueHolder213c9;

        return $this->valueHolder213c9->getExpressionBuilder();
    }

    public function beginTransaction()
    {
        $this->initializer47dde && ($this->initializer47dde->__invoke($valueHolder213c9, $this, 'beginTransaction', array(), $this->initializer47dde) || 1) && $this->valueHolder213c9 = $valueHolder213c9;

        return $this->valueHolder213c9->beginTransaction();
    }

    public function getCache()
    {
        $this->initializer47dde && ($this->initializer47dde->__invoke($valueHolder213c9, $this, 'getCache', array(), $this->initializer47dde) || 1) && $this->valueHolder213c9 = $valueHolder213c9;

        return $this->valueHolder213c9->getCache();
    }

    public function transactional($func)
    {
        $this->initializer47dde && ($this->initializer47dde->__invoke($valueHolder213c9, $this, 'transactional', array('func' => $func), $this->initializer47dde) || 1) && $this->valueHolder213c9 = $valueHolder213c9;

        return $this->valueHolder213c9->transactional($func);
    }

    public function commit()
    {
        $this->initializer47dde && ($this->initializer47dde->__invoke($valueHolder213c9, $this, 'commit', array(), $this->initializer47dde) || 1) && $this->valueHolder213c9 = $valueHolder213c9;

        return $this->valueHolder213c9->commit();
    }

    public function rollback()
    {
        $this->initializer47dde && ($this->initializer47dde->__invoke($valueHolder213c9, $this, 'rollback', array(), $this->initializer47dde) || 1) && $this->valueHolder213c9 = $valueHolder213c9;

        return $this->valueHolder213c9->rollback();
    }

    public function getClassMetadata($className)
    {
        $this->initializer47dde && ($this->initializer47dde->__invoke($valueHolder213c9, $this, 'getClassMetadata', array('className' => $className), $this->initializer47dde) || 1) && $this->valueHolder213c9 = $valueHolder213c9;

        return $this->valueHolder213c9->getClassMetadata($className);
    }

    public function createQuery($dql = '')
    {
        $this->initializer47dde && ($this->initializer47dde->__invoke($valueHolder213c9, $this, 'createQuery', array('dql' => $dql), $this->initializer47dde) || 1) && $this->valueHolder213c9 = $valueHolder213c9;

        return $this->valueHolder213c9->createQuery($dql);
    }

    public function createNamedQuery($name)
    {
        $this->initializer47dde && ($this->initializer47dde->__invoke($valueHolder213c9, $this, 'createNamedQuery', array('name' => $name), $this->initializer47dde) || 1) && $this->valueHolder213c9 = $valueHolder213c9;

        return $this->valueHolder213c9->createNamedQuery($name);
    }

    public function createNativeQuery($sql, \Doctrine\ORM\Query\ResultSetMapping $rsm)
    {
        $this->initializer47dde && ($this->initializer47dde->__invoke($valueHolder213c9, $this, 'createNativeQuery', array('sql' => $sql, 'rsm' => $rsm), $this->initializer47dde) || 1) && $this->valueHolder213c9 = $valueHolder213c9;

        return $this->valueHolder213c9->createNativeQuery($sql, $rsm);
    }

    public function createNamedNativeQuery($name)
    {
        $this->initializer47dde && ($this->initializer47dde->__invoke($valueHolder213c9, $this, 'createNamedNativeQuery', array('name' => $name), $this->initializer47dde) || 1) && $this->valueHolder213c9 = $valueHolder213c9;

        return $this->valueHolder213c9->createNamedNativeQuery($name);
    }

    public function createQueryBuilder()
    {
        $this->initializer47dde && ($this->initializer47dde->__invoke($valueHolder213c9, $this, 'createQueryBuilder', array(), $this->initializer47dde) || 1) && $this->valueHolder213c9 = $valueHolder213c9;

        return $this->valueHolder213c9->createQueryBuilder();
    }

    public function flush($entity = null)
    {
        $this->initializer47dde && ($this->initializer47dde->__invoke($valueHolder213c9, $this, 'flush', array('entity' => $entity), $this->initializer47dde) || 1) && $this->valueHolder213c9 = $valueHolder213c9;

        return $this->valueHolder213c9->flush($entity);
    }

    public function find($className, $id, $lockMode = null, $lockVersion = null)
    {
        $this->initializer47dde && ($this->initializer47dde->__invoke($valueHolder213c9, $this, 'find', array('className' => $className, 'id' => $id, 'lockMode' => $lockMode, 'lockVersion' => $lockVersion), $this->initializer47dde) || 1) && $this->valueHolder213c9 = $valueHolder213c9;

        return $this->valueHolder213c9->find($className, $id, $lockMode, $lockVersion);
    }

    public function getReference($entityName, $id)
    {
        $this->initializer47dde && ($this->initializer47dde->__invoke($valueHolder213c9, $this, 'getReference', array('entityName' => $entityName, 'id' => $id), $this->initializer47dde) || 1) && $this->valueHolder213c9 = $valueHolder213c9;

        return $this->valueHolder213c9->getReference($entityName, $id);
    }

    public function getPartialReference($entityName, $identifier)
    {
        $this->initializer47dde && ($this->initializer47dde->__invoke($valueHolder213c9, $this, 'getPartialReference', array('entityName' => $entityName, 'identifier' => $identifier), $this->initializer47dde) || 1) && $this->valueHolder213c9 = $valueHolder213c9;

        return $this->valueHolder213c9->getPartialReference($entityName, $identifier);
    }

    public function clear($entityName = null)
    {
        $this->initializer47dde && ($this->initializer47dde->__invoke($valueHolder213c9, $this, 'clear', array('entityName' => $entityName), $this->initializer47dde) || 1) && $this->valueHolder213c9 = $valueHolder213c9;

        return $this->valueHolder213c9->clear($entityName);
    }

    public function close()
    {
        $this->initializer47dde && ($this->initializer47dde->__invoke($valueHolder213c9, $this, 'close', array(), $this->initializer47dde) || 1) && $this->valueHolder213c9 = $valueHolder213c9;

        return $this->valueHolder213c9->close();
    }

    public function persist($entity)
    {
        $this->initializer47dde && ($this->initializer47dde->__invoke($valueHolder213c9, $this, 'persist', array('entity' => $entity), $this->initializer47dde) || 1) && $this->valueHolder213c9 = $valueHolder213c9;

        return $this->valueHolder213c9->persist($entity);
    }

    public function remove($entity)
    {
        $this->initializer47dde && ($this->initializer47dde->__invoke($valueHolder213c9, $this, 'remove', array('entity' => $entity), $this->initializer47dde) || 1) && $this->valueHolder213c9 = $valueHolder213c9;

        return $this->valueHolder213c9->remove($entity);
    }

    public function refresh($entity)
    {
        $this->initializer47dde && ($this->initializer47dde->__invoke($valueHolder213c9, $this, 'refresh', array('entity' => $entity), $this->initializer47dde) || 1) && $this->valueHolder213c9 = $valueHolder213c9;

        return $this->valueHolder213c9->refresh($entity);
    }

    public function detach($entity)
    {
        $this->initializer47dde && ($this->initializer47dde->__invoke($valueHolder213c9, $this, 'detach', array('entity' => $entity), $this->initializer47dde) || 1) && $this->valueHolder213c9 = $valueHolder213c9;

        return $this->valueHolder213c9->detach($entity);
    }

    public function merge($entity)
    {
        $this->initializer47dde && ($this->initializer47dde->__invoke($valueHolder213c9, $this, 'merge', array('entity' => $entity), $this->initializer47dde) || 1) && $this->valueHolder213c9 = $valueHolder213c9;

        return $this->valueHolder213c9->merge($entity);
    }

    public function copy($entity, $deep = false)
    {
        $this->initializer47dde && ($this->initializer47dde->__invoke($valueHolder213c9, $this, 'copy', array('entity' => $entity, 'deep' => $deep), $this->initializer47dde) || 1) && $this->valueHolder213c9 = $valueHolder213c9;

        return $this->valueHolder213c9->copy($entity, $deep);
    }

    public function lock($entity, $lockMode, $lockVersion = null)
    {
        $this->initializer47dde && ($this->initializer47dde->__invoke($valueHolder213c9, $this, 'lock', array('entity' => $entity, 'lockMode' => $lockMode, 'lockVersion' => $lockVersion), $this->initializer47dde) || 1) && $this->valueHolder213c9 = $valueHolder213c9;

        return $this->valueHolder213c9->lock($entity, $lockMode, $lockVersion);
    }

    public function getRepository($entityName)
    {
        $this->initializer47dde && ($this->initializer47dde->__invoke($valueHolder213c9, $this, 'getRepository', array('entityName' => $entityName), $this->initializer47dde) || 1) && $this->valueHolder213c9 = $valueHolder213c9;

        return $this->valueHolder213c9->getRepository($entityName);
    }

    public function contains($entity)
    {
        $this->initializer47dde && ($this->initializer47dde->__invoke($valueHolder213c9, $this, 'contains', array('entity' => $entity), $this->initializer47dde) || 1) && $this->valueHolder213c9 = $valueHolder213c9;

        return $this->valueHolder213c9->contains($entity);
    }

    public function getEventManager()
    {
        $this->initializer47dde && ($this->initializer47dde->__invoke($valueHolder213c9, $this, 'getEventManager', array(), $this->initializer47dde) || 1) && $this->valueHolder213c9 = $valueHolder213c9;

        return $this->valueHolder213c9->getEventManager();
    }

    public function getConfiguration()
    {
        $this->initializer47dde && ($this->initializer47dde->__invoke($valueHolder213c9, $this, 'getConfiguration', array(), $this->initializer47dde) || 1) && $this->valueHolder213c9 = $valueHolder213c9;

        return $this->valueHolder213c9->getConfiguration();
    }

    public function isOpen()
    {
        $this->initializer47dde && ($this->initializer47dde->__invoke($valueHolder213c9, $this, 'isOpen', array(), $this->initializer47dde) || 1) && $this->valueHolder213c9 = $valueHolder213c9;

        return $this->valueHolder213c9->isOpen();
    }

    public function getUnitOfWork()
    {
        $this->initializer47dde && ($this->initializer47dde->__invoke($valueHolder213c9, $this, 'getUnitOfWork', array(), $this->initializer47dde) || 1) && $this->valueHolder213c9 = $valueHolder213c9;

        return $this->valueHolder213c9->getUnitOfWork();
    }

    public function getHydrator($hydrationMode)
    {
        $this->initializer47dde && ($this->initializer47dde->__invoke($valueHolder213c9, $this, 'getHydrator', array('hydrationMode' => $hydrationMode), $this->initializer47dde) || 1) && $this->valueHolder213c9 = $valueHolder213c9;

        return $this->valueHolder213c9->getHydrator($hydrationMode);
    }

    public function newHydrator($hydrationMode)
    {
        $this->initializer47dde && ($this->initializer47dde->__invoke($valueHolder213c9, $this, 'newHydrator', array('hydrationMode' => $hydrationMode), $this->initializer47dde) || 1) && $this->valueHolder213c9 = $valueHolder213c9;

        return $this->valueHolder213c9->newHydrator($hydrationMode);
    }

    public function getProxyFactory()
    {
        $this->initializer47dde && ($this->initializer47dde->__invoke($valueHolder213c9, $this, 'getProxyFactory', array(), $this->initializer47dde) || 1) && $this->valueHolder213c9 = $valueHolder213c9;

        return $this->valueHolder213c9->getProxyFactory();
    }

    public function initializeObject($obj)
    {
        $this->initializer47dde && ($this->initializer47dde->__invoke($valueHolder213c9, $this, 'initializeObject', array('obj' => $obj), $this->initializer47dde) || 1) && $this->valueHolder213c9 = $valueHolder213c9;

        return $this->valueHolder213c9->initializeObject($obj);
    }

    public function getFilters()
    {
        $this->initializer47dde && ($this->initializer47dde->__invoke($valueHolder213c9, $this, 'getFilters', array(), $this->initializer47dde) || 1) && $this->valueHolder213c9 = $valueHolder213c9;

        return $this->valueHolder213c9->getFilters();
    }

    public function isFiltersStateClean()
    {
        $this->initializer47dde && ($this->initializer47dde->__invoke($valueHolder213c9, $this, 'isFiltersStateClean', array(), $this->initializer47dde) || 1) && $this->valueHolder213c9 = $valueHolder213c9;

        return $this->valueHolder213c9->isFiltersStateClean();
    }

    public function hasFilters()
    {
        $this->initializer47dde && ($this->initializer47dde->__invoke($valueHolder213c9, $this, 'hasFilters', array(), $this->initializer47dde) || 1) && $this->valueHolder213c9 = $valueHolder213c9;

        return $this->valueHolder213c9->hasFilters();
    }

    /**
     * Constructor for lazy initialization
     *
     * @param \Closure|null $initializer
     */
    public static function staticProxyConstructor($initializer)
    {
        static $reflection;

        $reflection = $reflection ?? new \ReflectionClass(__CLASS__);
        $instance   = $reflection->newInstanceWithoutConstructor();

        \Closure::bind(function (\Doctrine\ORM\EntityManager $instance) {
            unset($instance->config, $instance->conn, $instance->metadataFactory, $instance->unitOfWork, $instance->eventManager, $instance->proxyFactory, $instance->repositoryFactory, $instance->expressionBuilder, $instance->closed, $instance->filterCollection, $instance->cache);
        }, $instance, 'Doctrine\\ORM\\EntityManager')->__invoke($instance);

        $instance->initializer47dde = $initializer;

        return $instance;
    }

    protected function __construct(\Doctrine\DBAL\Connection $conn, \Doctrine\ORM\Configuration $config, \Doctrine\Common\EventManager $eventManager)
    {
        static $reflection;

        if (! $this->valueHolder213c9) {
            $reflection = $reflection ?? new \ReflectionClass('Doctrine\\ORM\\EntityManager');
            $this->valueHolder213c9 = $reflection->newInstanceWithoutConstructor();
        \Closure::bind(function (\Doctrine\ORM\EntityManager $instance) {
            unset($instance->config, $instance->conn, $instance->metadataFactory, $instance->unitOfWork, $instance->eventManager, $instance->proxyFactory, $instance->repositoryFactory, $instance->expressionBuilder, $instance->closed, $instance->filterCollection, $instance->cache);
        }, $this, 'Doctrine\\ORM\\EntityManager')->__invoke($this);

        }

        $this->valueHolder213c9->__construct($conn, $config, $eventManager);
    }

    public function & __get($name)
    {
        $this->initializer47dde && ($this->initializer47dde->__invoke($valueHolder213c9, $this, '__get', ['name' => $name], $this->initializer47dde) || 1) && $this->valueHolder213c9 = $valueHolder213c9;

        if (isset(self::$publicPropertiesa0b5d[$name])) {
            return $this->valueHolder213c9->$name;
        }

        $realInstanceReflection = new \ReflectionClass('Doctrine\\ORM\\EntityManager');

        if (! $realInstanceReflection->hasProperty($name)) {
            $targetObject = $this->valueHolder213c9;

            $backtrace = debug_backtrace(false, 1);
            trigger_error(
                sprintf(
                    'Undefined property: %s::$%s in %s on line %s',
                    $realInstanceReflection->getName(),
                    $name,
                    $backtrace[0]['file'],
                    $backtrace[0]['line']
                ),
                \E_USER_NOTICE
            );
            return $targetObject->$name;
        }

        $targetObject = $this->valueHolder213c9;
        $accessor = function & () use ($targetObject, $name) {
            return $targetObject->$name;
        };
        $backtrace = debug_backtrace(true, 2);
        $scopeObject = isset($backtrace[1]['object']) ? $backtrace[1]['object'] : new \ProxyManager\Stub\EmptyClassStub();
        $accessor = $accessor->bindTo($scopeObject, get_class($scopeObject));
        $returnValue = & $accessor();

        return $returnValue;
    }

    public function __set($name, $value)
    {
        $this->initializer47dde && ($this->initializer47dde->__invoke($valueHolder213c9, $this, '__set', array('name' => $name, 'value' => $value), $this->initializer47dde) || 1) && $this->valueHolder213c9 = $valueHolder213c9;

        $realInstanceReflection = new \ReflectionClass('Doctrine\\ORM\\EntityManager');

        if (! $realInstanceReflection->hasProperty($name)) {
            $targetObject = $this->valueHolder213c9;

            $targetObject->$name = $value;

            return $targetObject->$name;
        }

        $targetObject = $this->valueHolder213c9;
        $accessor = function & () use ($targetObject, $name, $value) {
            $targetObject->$name = $value;

            return $targetObject->$name;
        };
        $backtrace = debug_backtrace(true, 2);
        $scopeObject = isset($backtrace[1]['object']) ? $backtrace[1]['object'] : new \ProxyManager\Stub\EmptyClassStub();
        $accessor = $accessor->bindTo($scopeObject, get_class($scopeObject));
        $returnValue = & $accessor();

        return $returnValue;
    }

    public function __isset($name)
    {
        $this->initializer47dde && ($this->initializer47dde->__invoke($valueHolder213c9, $this, '__isset', array('name' => $name), $this->initializer47dde) || 1) && $this->valueHolder213c9 = $valueHolder213c9;

        $realInstanceReflection = new \ReflectionClass('Doctrine\\ORM\\EntityManager');

        if (! $realInstanceReflection->hasProperty($name)) {
            $targetObject = $this->valueHolder213c9;

            return isset($targetObject->$name);
        }

        $targetObject = $this->valueHolder213c9;
        $accessor = function () use ($targetObject, $name) {
            return isset($targetObject->$name);
        };
        $backtrace = debug_backtrace(true, 2);
        $scopeObject = isset($backtrace[1]['object']) ? $backtrace[1]['object'] : new \ProxyManager\Stub\EmptyClassStub();
        $accessor = $accessor->bindTo($scopeObject, get_class($scopeObject));
        $returnValue = $accessor();

        return $returnValue;
    }

    public function __unset($name)
    {
        $this->initializer47dde && ($this->initializer47dde->__invoke($valueHolder213c9, $this, '__unset', array('name' => $name), $this->initializer47dde) || 1) && $this->valueHolder213c9 = $valueHolder213c9;

        $realInstanceReflection = new \ReflectionClass('Doctrine\\ORM\\EntityManager');

        if (! $realInstanceReflection->hasProperty($name)) {
            $targetObject = $this->valueHolder213c9;

            unset($targetObject->$name);

            return;
        }

        $targetObject = $this->valueHolder213c9;
        $accessor = function () use ($targetObject, $name) {
            unset($targetObject->$name);

            return;
        };
        $backtrace = debug_backtrace(true, 2);
        $scopeObject = isset($backtrace[1]['object']) ? $backtrace[1]['object'] : new \ProxyManager\Stub\EmptyClassStub();
        $accessor = $accessor->bindTo($scopeObject, get_class($scopeObject));
        $accessor();
    }

    public function __clone()
    {
        $this->initializer47dde && ($this->initializer47dde->__invoke($valueHolder213c9, $this, '__clone', array(), $this->initializer47dde) || 1) && $this->valueHolder213c9 = $valueHolder213c9;

        $this->valueHolder213c9 = clone $this->valueHolder213c9;
    }

    public function __sleep()
    {
        $this->initializer47dde && ($this->initializer47dde->__invoke($valueHolder213c9, $this, '__sleep', array(), $this->initializer47dde) || 1) && $this->valueHolder213c9 = $valueHolder213c9;

        return array('valueHolder213c9');
    }

    public function __wakeup()
    {
        \Closure::bind(function (\Doctrine\ORM\EntityManager $instance) {
            unset($instance->config, $instance->conn, $instance->metadataFactory, $instance->unitOfWork, $instance->eventManager, $instance->proxyFactory, $instance->repositoryFactory, $instance->expressionBuilder, $instance->closed, $instance->filterCollection, $instance->cache);
        }, $this, 'Doctrine\\ORM\\EntityManager')->__invoke($this);
    }

    public function setProxyInitializer(\Closure $initializer = null) : void
    {
        $this->initializer47dde = $initializer;
    }

    public function getProxyInitializer() : ?\Closure
    {
        return $this->initializer47dde;
    }

    public function initializeProxy() : bool
    {
        return $this->initializer47dde && ($this->initializer47dde->__invoke($valueHolder213c9, $this, 'initializeProxy', array(), $this->initializer47dde) || 1) && $this->valueHolder213c9 = $valueHolder213c9;
    }

    public function isProxyInitialized() : bool
    {
        return null !== $this->valueHolder213c9;
    }

    public function getWrappedValueHolderValue()
    {
        return $this->valueHolder213c9;
    }
}

if (!\class_exists('EntityManager_9a5be93', false)) {
    \class_alias(__NAMESPACE__.'\\EntityManager_9a5be93', 'EntityManager_9a5be93', false);
}
