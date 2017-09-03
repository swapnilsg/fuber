const chai =require('chai'),
      expect = chai.expect;
const sinon = require('sinon');
const model = require('./models');
const mocha = require('mocha').beforeEach;
should = chai.should();
const _ =require('underscore');
const cars=require('./cars');

const obj = new model();

describe('Unit test for booking pink cab',()=>{
    let pink=true,lat=20,lan=20;
    it("Should book an available pink  cab",()=>{
        let result=obj.bookride(pink,lat,lan);
        expect(result).to.be.a('object');
        result.lat.should.equal(lat);
        result.lan.should.equal(lan);
        result.pink.should.equal(true);
    });
});

describe('Unit test for booking cab',()=>{
    let pink=false,lat=10,lan=10;
    it("Should book an available cab",()=>{
        let result=obj.bookride(pink,lat,lan);
        expect(result).to.be.a('object');
        result.lat.should.equal(lat);
        result.lan.should.equal(lan);
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

