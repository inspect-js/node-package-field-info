declare module 'object.entries' {
	function entries<T extends object>(
		obj: T,
	): [Exclude<keyof T & string, '__proto__'>, T[Exclude<keyof T & string, '__proto__'>]][];
	export = entries;
}
