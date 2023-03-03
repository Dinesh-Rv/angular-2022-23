import {
  Component,
  Input,
  OnChanges,
  Output,
  EventEmitter,
  OnInit,
} from '@angular/core';
import { Category } from 'src/app/category';
import { CommonService } from 'src/app/service/common.service';
import { ToDoService } from 'src/app/service/to-do.service';

@Component({
  selector: 'app-side-bar-category',
  templateUrl: './side-bar-category.component.html',
  styleUrls: ['./side-bar-category.component.scss'],
})
export class SideBarCategoryComponent implements OnChanges, OnInit {
  @Input() newCategory!: Category;
  @Output() selectedCategoryEvent = new EventEmitter<Category>();
  selectedCategory!: Category;
  categories: Category[] = [];
  constructor(
    private toDoService: ToDoService,
    private commonService: CommonService
  ) {}

  applySelectedCategory(value: Category) {
    this.commonService.applySelectedCategory(value);
  }

  getAllCategories() {
    this.toDoService.getCategories().subscribe((existingCategories) => {
      this.categories = existingCategories as Category[];
      if (!this.selectedCategory) {
        this.selectedCategory = this.categories[0];
        this.commonService.applySelectedCategory(this.selectedCategory);
      }
    });
  }

  ngOnInit() {
    this.commonService.presentCategory.subscribe((presentCategory) => {
      this.selectedCategory = presentCategory;
    });
  }

  ngOnChanges() {
    this.getAllCategories();
  }
}
