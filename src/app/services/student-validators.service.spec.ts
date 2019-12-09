import { TestBed } from "@angular/core/testing";

import { StudentValidatorsService } from "./student-validators.service";

describe("StudentValidatorsService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: StudentValidatorsService = TestBed.get(StudentValidatorsService);
    expect(service).toBeTruthy();
  });
});
