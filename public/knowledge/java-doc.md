
# Table Of Content
- [PriorityQueue](#PriorityQueue)
- [LinkedList](#LinkedList)
- [Stack](#Stack)
- [ArrayList](#ArrayList)
- [HashMap](#HashMap)
- [HashSet](#HashSet)
- [Sorted Set - TreeSet](#TreeSet)
- [Array](#Array)
- [String](#String)
- [Integer](#Integer)
- [Pair](#Pair)
- [Misc](#Misc)


## PriorityQueue

```java
Queue<Integer> queue = new PriorityQueue<>();
PriorityQueue<Integer> numbers = new PriorityQueue<>(Collections.reverseOrder());
PriorityQueue<String> pq = new PriorityQueue<String>((a, b) -> map.get(a) == map.get(b) ? b.compareTo(a) : map.get(a) - map.get(b)); // from hashmap to sorted pq

pq.add(25); // returns true/false, throws exception if fails to add
pq.offer(62); // does not throw an exception even if it fails to add the element in the queue
pq.poll(); // remove latest item and returns it
pq.remove(Object o); // returns true/false if object is present, throws exception if fails
pq.peek(); // without removing returns the item
pq.contains(34); // returns true/false
pq.clear(); // returns nothing
pq.toArray(); // returns Obect[]
```




## LinkedList

```java
Queue<TreeNode> queue = new LinkedList<>();

queue.add(root); // returns true/false, insert at the end of list
queue.add(3, root); // void, inserts element at index 3
queue.addFirst(root); // void, insert at the first index
queue.addLast(root); // void, insert at the last index
queue.clear(); // void, Removes all of the elements from this list
queue.contains(root); // boolean
queue.get(2) // Object e, get element from index
queue.getFirst(), getLast()
queue.peek(), peekFirst(), peekLast() // returns null if this list is empty
queue.poll(), pollFirst(), pollLast() // returns null if this list is empty
queue.isEmpty();
queue.peek(); // returns the value but don't remove it
queue.poll(); // returns the value while removing it from the queue


Deque<String> deque = new LinkedList<>();

deque.add("two");
deque.add("one");
deque.addFirst("three");


Queue<TreeNode> queue = new ArrayDeque<>();
ArrayDeque<String> stack = new ArrayDeque<>(); // doesn't support null element
// faster than LinkedList and Stack
stack.push("Horse"); // Boolean
stack.peek(); // String
stack.pop(); // String
stack.add(), addFirst(), addLast() // throws exception if fails
stack.offer(), stack.offerFirst(), stack.offerLast() // same as add but doesnt throw exc
stack.getFirst(), stack.getLast() // throws exception if fails
stack.peek(), peekFirst(), peekLast() // same as get but doesnt throw exc
stack.removeFirst(), removeLast() // throws exception if fails
stack.pollFirst(), pollLast() // same as remove but doesnt throw exc
```



## Stack

```java
Stack<Integer> s1 = new Stack<>();

s1.push(x); // Object e
s1.pop(); // Object e, removes the obj and returns
s1.peek(); // Object e, look at obj without removing
s1.empty(); // tests if this stack is empty
s1.search(Object o); // int, 1-based position where an object is on this stack
s1.isEmpty();
```



## ArrayList

```java
List<Character> list = Arrays.asList('a','e','i','o','u','A','E','I','O','U'); // immutable list
List<String> ls = new ArrayList<>();
List<String> str = List.of("foo", "bar", "baz"); // immutable list
new ArrayList<>(storage); // arraylist from set - storage is Set<List<Integer>>

ls.toArray(new String[0])
String[] myArray = new String[list.size()];
list.toArray(myArray); // String[]
list.add(new ArrayList<>(oldList)); // void
list.clear(); // void
list.remove(0); // Object o, remove first element
list.remove(Object o); // boolean, remove object
list.get(1); // get item from index 1
list.contains(Object o); // boolean
list.indexOf(Object o); // int
list.lastIndexOf(Object o); // int
list.clone(); // Object, shallow copy
list.isEmpty(); // boolean
list.toArray(); // Object[]
list.set(index, Object); // Object , set element at sepcified index 0-based, returns previously set value
list.subList(4, list.size()).clear(); // List<>, clears everything from index 4 till end inclusive
List<Integer> clonedList = new ArrayList(oldArraylist); // here oldArraylist is the arraylist you want to clone
```



## HashMap

```java
HashMap<Integer, String> hash_map = new HashMap<Integer, String>();

for (Map.Entry<String,String> entry : gfg.entrySet()) // iterate over map
System.out.println("Key = " + entry.getKey() +", Value = " + entry.getValue());

map.put(s, map.getOrDefault(s, 0)+1); // instead of doing 'increase value of key if key is present otherwise put a value 1'

String key = Collections.max(map.entrySet(), Map.Entry.comparingByValue()).getKey();

hash_map.put(10, "JDs"); // Object
hash_map.get(25); // Object
hash_map.putIfAbsent(10, "Dog"); // Object
hash_map.containsValue("Dog"); // Boolean
hash_map.containsKey(10); // Boolean
hash_map.getOrDefault(25, "default_string"); // Object
hash_map.clear(); // void, empty the map
hash_map.isEmpty(); // boolean, returns boolean
hash_map.keySet(); // Set<Object>
hash_map.values(); // Set<Object>
hash_map.remove(key, value); // Boolean, only if given key/value pair is present
hash_map.remove(key); // Object of type value, returns the value
hash_map.replace(key, old, new); // Boolean, replace only if old value is matched
hash_map.replace(key, new); // Boolean, replace the whatever value
hash_map.entrySet(); // Set<Map.Entry<K,V>>
```



## HashSet

```java
Set<Integer> storage = new HashSet<>(); // can contain null
Set<Integer> storage = new LinkedHashSet<>(); // can contain null, maintains insertion order

storage.add(34); // Boolean
storage.add(list); // Boolean
storage.contains(23); // Boolean
storage.remove(Object); // Boolean
storage.clear(); // void
storage.isEmpty(); // Boolean
storage.toArray(); // Object[]

Iterator<String> itr=set.iterator();    
while(itr.hasNext()) {    
    System.out.println(itr.next());    
}
```



## TreeSet

```java
TreeSet<Integer> nums = new TreeSet(); // automatically sort element, logn search time

// contains all the methods of SortedSet. In addition methods like ceiling(), floor(), higher(), lower() etc
SortedSet<Integer> nums = new TreeSet(); // this contains fewer method than above

nums.add(15);
nums.add(5);
nums.add(34); // Boolean, ans will be 5, 15, 34
nums.first(); // Object, returns 5
nums.last(); // Object, returns 34
nums.pollFirst(); // Object, removes first
nums.pollLast(); // Object, removes last
nums.higher(Object); // Object, least element in this set strictly greater than given element/null
nums.lower(Object); // Object, greatest element in this set strictly less than given element/null
nums.remove(nums.first());
nums.isEmpty() // Boolean
nums.contains(Object) // Boolean
```



## Array

```java
String[] arr = {"one", "two", "three"};

int[] anArray = new int[] {1, 2, 3, 4, 5};
Arrays.equals(arr, temp) // boolean
Arrays.deepEquals(arr, temp); // boolean
Arrays.toString(temp) // 1,2,3,4 print like this
Arrays.copyOf(heights, len); // int[], if len>heights.length then padding with appropriate Object based on type of heights
Arrays.copyOfRange(nums, start, end); // int[]
arr.clone(); // int[]

int max = Arrays.stream(candies).max().getAsInt();

Arrays.fill(arr, false); // void
Arrays.hashCode(arr); // int, always returns the int hashcode
Arrays.sort(copy, Collections.reverseOrder()); // reversed sorted array
Arrays.parallelSort(arr); // void, faster sorting
Arrays.binarySearch(copy, score[i], Collections.reverseOrder()); // int, find with binarySearch in reversed array
Arrays.binarySearch(copy, score[i], fromIndex, toIndex); // int
Arrays.asList(anArray); // List<Integer>
```



## String

```java
int count = 5;
"a".repeat(count) // repeat string for count times >> aaaaa

sb.append("rutvi");
sb.reverse();
sb.setLength(0); // to make it empty
if(sb.length()>0) sb.setLength(sb.length()-1); // to remove last character
sb.setCharAt(indices[i],s.charAt(i));
sb.replace(start,end,"hi");
sb.deleteCharAt(2);

Character.isUpperCase(word.charAt(i));

String[] words = paragraph.replaceAll("[!?',;.]"," ").toLowerCase().split("\\s+"); // remove !?',;. from string and split by space

Character.isAlphabetic(s.charAt(i)) // a,A,c,C,z,Z,x,f,Y,G true.. 1,3,5,[,*,- false
String.join(" ", ans); // ans[] = ['n','e','w'];
s1.replaceAll(word, word2); // String

new String(charArray); // String

s1.charAt(2); // character
s1.compareTo(anotherString) // int, 0 -1 1
s1.compareToIgnoreCase(str) // int, 0 -1 1
s1.concat(str) // String
s1.contains(charArray/ anyString); // Boolean
s1.contentEquals(charArray / stringbuffer); // Boolean
s1.endsWith(str); // Boolean
s1.equals(Object / anotherStr); // Boolean
s1.equalsIgnoreCase(anotherString); // Boolean
s1.indexOf(ch/str); // int
s1.indexOf(ch/str, fromIndex); // int
s1.lastIndexOf(ch/str, fromIndex); // int
s1.replace(char/str, newChar/newStr); // String
s1.startsWith(str); // Boolean
s1.substring(fromIndex, (lastIndex)); // String
s1.toCharArray(); // char[]
s1.toLowerCase(), toUpperCase(), trim() // String

String.valueOf(15); // String, "15"
String.valueOf(true); // String, "true"

for (char c : str.toCharArray()) // always traverse string like this
String newstr = new String(charArr); // char array to string
```



## Integer

```java
Integer.toBinaryString(5); // String, "101"
Integer.toHexString(15); // String, "F"
Integer.toOctalString(9); // String, "10"
Integer.toString(2537); // "2537"
Integer.parseInt("685"); // int, 685
Integer.rotateRight(2547, 2); // int, rotating the 2's complement binary representation of 2537by 2 bit
Integer.bitCount(6); // int, 2

Character.getNumericValue(str.charAt(i)); // faster than Integer.parseInt

x.doubleValue(); // Double, where x is Integer
x.intValue(); // int
x.floatValue(); // Float
```

## Pair

```java
Pair<String, Integer> p = new Pair<>("jaydeep", 16);
// Pair simply provides key value pair of any type
p.getKey(); // Object, "jaydeep"
p.getValue(); // Object, 16
```


## Misc

```java
// Java compile code with external jar
javac -cp '.:json-20140107.jar' test.java
java -cp '.:json-20140107.jar' test

//check for even
if((num & 1) == 0)

// divide by 2
num >> 1

// length of the int
int length = (int) Math.log10(number) + 1;
```

#### Custom Comparator

When to use this ?
- Sometimes we can't modify the source code of the class whose objects we want to sort, thus making the use of _Comparable_ impossible
- Using _Comparators_ allows us to avoid adding additional code to our domain classes
- We can define multiple different comparison strategies, which isn't possible when using _Comparable_

```java
Comparator<Pairs> comparator = (p1, p2) -> p1.getrank() - p2.getrank();
list.sort(comparator);
```

#### Comparator Using Interface (recommended)

```java
public class PlayerAgeComparator implements Comparator<Player> {
	@Override
	public int compare(Player firstPlayer, Player secondPlayer) {
		return Integer.compare(firstPlayer.getAge(), secondPlayer.getAge());
	}
}
// usage
PlayerRankingComparator playerComparator = new PlayerRankingComparator();
Collections.sort(footballTeam, playerComparator);
```

sort 2d array based on column wise, like dictionary

```java
	Arrays.sort(stockPrices, Arrays::compare);
```

sort multi-d array using any column (faster than previous method)

```java
Arrays.sort(stockPrices, (a, b) -> Integer.compare(a[2], b[2]));
```

log2
```java
int result = (int)(Math.log(N) / Math.log(2))
```

reverse collection
```java
Collections.reverse(list);
```

1-bit change
`i^(i/2)`