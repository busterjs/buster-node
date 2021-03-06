var buster = require("../lib/buster-node");
var assert = buster.assert;
var refute = buster.refute;
var expect = buster.expect;

buster.testCase("Test case", {
    "it uses assert": function () {
        assert.equals(12, 12);
    },

    "it fails assertion": function () {
        assert.exception(function () {
            assert.equals(13, 42);
        });
    },

    "it uses refute": function () {
        refute.equals(13, 42);
    },

    "it fails refutation": function () {
        assert.exception(function () {
            refute.equals(42, 42);
        });
    },

    "it uses spy": function () {
        var spy = this.spy();
        spy(42);

        assert.calledOnce(spy);
        assert.calledWith(spy, 42);
    },

    "it fails sinon assertion": function () {
        var spy = this.spy();
        assert.exception(function () {
            assert.calledOnce(spy);
        });
    },

    "it uses mock expectations": function () {
        var obj = { meth: function () {} };
        this.mock(obj).expects("meth").once();

        obj.meth();
    },

    "it fails mock expectation": function (done) {
        var runner = buster.testRunner.create();

        var meth = function () {};
        var obj = { meth: meth };

        var tc = buster.testCase("Sandbox test", {
            "test implicit verification": function () {
                this.mock(obj).expects("meth").once();
            }
        });

        runner.on("suite:end", done(function (results) {
            refute(results.ok);
            assert.same(obj.meth, meth);
        }));

        runner.runSuite([tc]);
    }
});

buster.spec.expose();

describe("Spec", function () {
    it("uses expectations", function () {
        expect(42).toEqual(42);
    });

    it("fails expectation", function () {
        expect(function () {
            expect(42).toEqual(13);
        }).toThrow();
    });
});
