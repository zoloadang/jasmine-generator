(function() {
 
	describe("test", function() {

            it("simple", function() {
                expect(Test.simple('hehe')).toBe('HEHE');
            });

            it("complex1", function() {
                var ret1 = Test.complex('{"a":"b", "c":"d"}');
                expect(ret1['a']).toBe('b'	);
                expect(ret1['c']).toBe('d');
            });

            it("complex2", function() {
                var ret2 = Test.complex('{"e":"f"}');
                expect(ret2['e']).toBe('f'	);
            });

            it("get sum", function() {
                var a = 3 * 3,
                b = 10 / 5;
                expect(Test.sum(a, b)).toBe(11);
            });

        }); 
 
})();
