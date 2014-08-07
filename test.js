require(
  [
    'lib.js',
    'helpers.js'
  ],
  function (lib) {
    var myMatchers = {
      toEqualArray: function (util, customEqualityTesters) {
        return {
          compare: function (actual, expected) {
            if (expected === undefined) {
              expected = [];
            }
            var result = {
              pass: false
            };
            if (!Array.isArray(actual) || !Array.isArray(expected)) {
              result.message = 'Not arrays passed'
              return result;
            }
            if (result.pass = actual.equals(expected)) {
              result.message = "It's OK"
            } else {
              result.message = "They aren't equal"
            }
            return result;
          }
        }
      }
    };


    describe('lib', function () {
      beforeEach(function () {
        jasmine.addMatchers(myMatchers);
      });
      var toEqualArray = function (first, second) {
        if (!Array.isArray(first) || !Array.isArray(second)) {
          return
        }
        for (var i = second.length - 1; i >= 0; i--) {
          if (first.indexOf(second[i]) == -1) {
            return false
          }
        };
        return true;
      };


      it('содержит все нужные функции', function () {
        var expectedFunctions = [
          'clearSet',
          'getSubset'
        ];
        for (var i = expectedFunctions.length - 1; i >= 0; i--) {
          expect(lib[expectedFunctions[i]]).not.toBeUndefined();
        };
      });

      describe('clearSet', function () {
        it('убирает дубликаты', function () {
          var set = [1, 2, 3, 3],
            expected = [1, 2, 3];
          expect(lib.clearSet(set)).toEqualArray(expected);
        });

        it('крэшится на неверных типах данных', function () {
          expect(lib.clearSet.bind(null, '1')).toThrow();
          expect(lib.clearSet.bind(null, 1)).toThrow();
          expect(lib.clearSet.bind(null, null)).toThrow();
        });
      });

      describe('getSubset', function () {
        var sum = 10;

        it('returns all expected results', function () {
          var set = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            expected = [
              [1, 2, 3, 4],
              [1, 2, 7],
              [1, 3, 6],
              [1, 4, 5],
              [1, 9],
              [2, 3, 5],
              [2, 8],
              [3, 7],
              [4, 6],
              [10]
            ];
          expect(lib.getSubset(set, sum)).toEqualArray(expected);
        });
        it('works good on negative values', function () {
          var set = [-1, 11, 10],
            expected = [
              [-1, 11],
              [10]
            ];
          expect(lib.getSubset(set, sum)).toEqualArray(expected);
        })
      });
    });

    executeTests()
  }
)
