const chai =require('chai'),
      expect = chai.expect;
const sinon = require('sinon');
const model = require('./models');
const mocha = require('mocha').beforeEach;
should = chai.should();
const _ =require('underscore');
const cars=require('./cars');

const obj = new model();

describe('Unit test cases for cab booking app',()=>{
    describe('Unit test for booking cab',()=>{
        it("Should book an available cab",()=>{
            let pink=false,lat=25,lan=25;
            let result=obj.bookride(pink,lat,lan);
            expect(result).to.be.a('object');
            result.id.should.equal(105);
            result.lat.should.equal(lat);
            result.lan.should.equal(lan);
        });
        it("Should book an available pink  cab",()=>{
            let pink=true,lat=20,lan=20;
            let result=obj.bookride(pink,lat,lan);
            expect(result).to.be.a('object');
            result.id.should.equal(103);
            result.lat.should.equal(lat);
            result.lan.should.equal(lan);
            result.pink.should.equal(true);
        });
    });

    describe('Unit test for ending ride',()=>{
        let id=101,lat=50,lan=50;
        it("Should end ride and return distance and price",()=>{
            let result=obj.endride(id,lat,lan);
            expect(result).to.be.a('string');
            expect(result).to.have.string('distance');
            expect(result).to.have.string('price');
        });
        it("Should update the cab location to user location",()=>{
            let result=obj.endride(id,lat,lan);
            let bookedCab = _.findWhere(cars,{id:id});
            bookedCab.lat.should.equal(lat);
            bookedCab.lan.should.equal(lan);
            bookedCab.availabel.should.equal(true);
        });
        it("Should end the pink cab ride",()=>{
            let id=103;
            let result=obj.endride(id,lat,lan);
            expect(result).to.be.a('string');
            expect(result).to.have.string('distance');
            expect(result).to.have.string('price');
        });
    });

    describe('Unit test for cabs not available',()=>{
        let message = 'No cabs found, please try again later';
        it('should return no cabs available message',()=>{
            let stub = sinon.stub(obj,'bookride');
            stub.returns('No cabs found, please try again later');
            let result=obj.bookride(false,25,25);
            result.should.be.a('string');
            expect(result).to.equal(message);
            stub.reset();
        });
    });
});


